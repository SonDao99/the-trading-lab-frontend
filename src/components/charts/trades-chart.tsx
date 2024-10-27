"use client";

import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { BackTestData } from "@/lib/constants";

// Definition of the data structure
type BalanceData = {
  trade: number;
  balance: number;
};

// Pseudo data generator to visualise before the API attaches
// const generateData = (count: number): BackTestData[] => {
//   const data: BackTestData[] = [];
//   let balance = startingBalance;
//   let trend = 0;
//   for (let i = 0; i < count; i++) {
//     if (i % 30 === 0) {
//       trend = Math.random() * 10000 - 5000;
//     }
//     balance += trend + (Math.random() * 5000 - 2500);
//     balance = Math.max(balance, 900000);
//     data.push({ trade: i + 1, balance: parseFloat(balance.toFixed(2)) });
//   }
//   return data;
// };

// Visualise balance over course of previous backtest
export default function BacktestChart({ data }: { data: BackTestData[] }) {
  const startingBalance = 10000;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<HTMLCanvasElement>(null);
  const margin = { top: 20, right: 80, bottom: 80, left: 100 };
  const [panOffset, setPanOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [zoomState, setZoomState] = useState(1);
  const yScaleRef = useRef<d3.ScaleLinear<number, number, never>>();
  const zoomedXScaleRef = useRef<d3.ScaleLinear<number, number, never>>();
  // Might need to memoize/optimize if much more than 500 trades
  // const [data] = useState<BalanceData[]>(generateData(500))

  // Draws the actual chart
  const drawChart = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const hoverCanvas = hoverRef.current;
    if (!container || !canvas || !hoverCanvas) return;

    const height = container.clientHeight;
    const width = container.clientWidth;

    // Canvs size and pixel ratio setup
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`; //
    hoverCanvas.style.height = `${height}px`;
    hoverCanvas.style.width = `${width}px`;

    const scale = window.devicePixelRatio;
    canvas.height = Math.floor(height * scale);
    canvas.width = Math.floor(width * scale);
    hoverCanvas.height = Math.floor(height * scale);
    hoverCanvas.width = Math.floor(width * scale);

    const ctx = canvas.getContext("2d");
    const hoverCtx = hoverCanvas.getContext("2d");
    if (!ctx || !hoverCtx) return;

    ctx.scale(scale, scale);
    hoverCtx.scale(scale, scale);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hoverCtx.clearRect(0, 0, canvas.width, canvas.height);

    const usableWidth = canvas.width / scale - margin.left - margin.right;
    const usableHeight = canvas.height / scale - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, margin.left + usableWidth]);

    const yHigh = Math.max(...data.map((d) => d.balance), startingBalance);
    const yLow = Math.min(...data.map((d) => d.balance), startingBalance);
    const yScale = d3
      .scaleLinear()
      .domain([yLow, yHigh])
      .range([usableHeight, margin.top]);
    yScaleRef.current = yScale;

    const zoomedXScale = d3
      .scaleLinear()
      .domain(xScale.domain())
      .range([
        panOffset + margin.left,
        usableWidth * zoomState + panOffset + margin.left,
      ]);
    zoomedXScaleRef.current = zoomedXScale;

    // Draw axes
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, canvas.height / scale - margin.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(margin.left, canvas.height / scale - margin.bottom);
    ctx.lineTo(
      canvas.width / scale - margin.right,
      canvas.height / scale - margin.bottom
    );
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    const xTicks = zoomedXScale.ticks(5);
    xTicks.forEach((tick) => {
      const xCoord = zoomedXScale(tick);
      const yCoord = canvas.height / scale - margin.bottom / 1.5;
      ctx.fillText(tick.toString(), xCoord, yCoord);
    });

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const yTicks = yScale.ticks(5);
    yTicks.forEach((tick) => {
      const xCoord = margin.left - 20;
      const yCoord = yScale(tick);
      ctx.fillText(tick.toLocaleString(), xCoord, yCoord);
    });

    // Draw area and line with changing colors
    ctx.lineWidth = 2;
    let prevX = zoomedXScale(0);
    let prevY = yScale(data[0].balance);
    const startingBalanceY = yScale(startingBalance);

    data.forEach((point, index) => {
      const x = zoomedXScale(index);
      const y = yScale(point.balance);

      // Draw green area which above starting balance to the line
      if (point.balance >= startingBalance) {
        ctx.beginPath();
        ctx.moveTo(prevX, Math.max(prevY, startingBalanceY));
        ctx.lineTo(x, y);
        ctx.lineTo(x, startingBalanceY);
        ctx.lineTo(prevX, startingBalanceY);
        ctx.closePath();
        ctx.fillStyle = "rgba(74, 222, 128, 0.2)"; // Green
        ctx.fill();
      }

      // Draw red area which is below startBal line but to the top of red line
      if (point.balance < startingBalance) {
        ctx.beginPath();
        ctx.moveTo(prevX, Math.min(prevY, startingBalanceY));
        ctx.lineTo(x, y);
        ctx.lineTo(x, startingBalanceY);
        ctx.lineTo(prevX, startingBalanceY);
        ctx.closePath();
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)"; // Red
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);

      if (point.balance >= startingBalance) {
        ctx.strokeStyle = "#4ade80"; // Green
      } else {
        ctx.strokeStyle = "#ef4444"; // Red
      }

      ctx.stroke();

      prevX = x;
      prevY = y;
    });

    // Draw starting balance line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(margin.left, startingBalanceY);
    ctx.lineTo(canvas.width / scale - margin.right, startingBalanceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label for starting balance
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.textAlign = "left";
    ctx.fillText("Starting Balance", margin.left + 10, startingBalanceY - 10);
  };

  useEffect(() => {
    drawChart();
    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [data, zoomState, panOffset]);

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setZoomState((prevZoom) =>
      Math.max(1, Math.min(10, prevZoom * (1 - e.deltaY * 0.001)))
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const hoverCanvas = hoverRef.current;
    if (!canvas || !hoverCanvas) return;
    const scale = window.devicePixelRatio;

    const hoverCtx = hoverCanvas.getContext("2d");
    if (hoverCtx) {
      hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
      const rect = hoverCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      // Only show the trade info when inside valid boundary
      if (
        mouseX >= margin.left &&
        mouseX <= hoverCanvas.width / scale - margin.right
      ) {
        if (yScaleRef.current && zoomedXScaleRef.current) {
          hoverCtx.fillStyle = "white";
          hoverCtx.font = "15px Arial";
          hoverCtx.textAlign = "center";

          // Can get rid of this if starting balance line needs to be dead accurate
          // X-axis value
          const xValue = Math.round(zoomedXScaleRef.current.invert(mouseX));
          const xAxisText = `Trade ${xValue}`;
          hoverCtx.fillStyle = "white";
          hoverCtx.fillText(
            xAxisText,
            mouseX,
            hoverCanvas.height / scale - margin.bottom + 20
          );

          // Vertical line
          if (xValue >= 0 && xValue < data.length) {
            const yValue = data[xValue].balance;
            hoverCtx.beginPath();
            hoverCtx.setLineDash([5, 5]);
            hoverCtx.strokeStyle =
              yValue >= startingBalance ? "#4ade80" : "#ef4444";
            hoverCtx.lineWidth = 1;
            hoverCtx.moveTo(mouseX, margin.top);
            hoverCtx.lineTo(mouseX, hoverCanvas.height / scale - margin.bottom);
            hoverCtx.stroke();

            // Y-axis value
            const yCoord = yScaleRef.current(yValue);
            hoverCtx.beginPath();
            hoverCtx.arc(mouseX, yCoord, 4, 0, 2 * Math.PI);
            hoverCtx.fill();
            hoverCtx.fillText(
              `$${yValue.toLocaleString()}`,
              mouseX,
              yCoord - 10
            );
          }
        }
      }
    }

    if (isDragging) {
      const dragDistance = e.clientX - dragStart;
      const canvasWidth = canvas.width / scale - margin.left - margin.right;

      setPanOffset((prevOffset) => {
        const newOffset = prevOffset + dragDistance;
        return Math.max(
          -(canvasWidth * zoomState - canvasWidth),
          Math.min(0, newOffset)
        );
      });

      setDragStart(e.clientX);
    }
  };

  // Stops the page scrolling - was annoying when zooming on graph
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas-container flex flex-auto w-1/3">
      <canvas ref={canvasRef} className="flex-1"></canvas>
      <canvas
        ref={hoverRef}
        className="absolute z-10 flex-1"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></canvas>
    </div>
  );
}
