"use client";
import { StockData, StockPrices } from "@/lib/constants";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function CandlestickChart({ data }: { data: StockPrices[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<HTMLCanvasElement>(null);
  const margin = { top: 20, right: 80, bottom: 80, left: 80 };
  const [panOffset, setPanOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [zoomState, setZoomState] = useState(1);
  const [candleWidth, setCandleWidth] = useState(0);
  const yScaleRef = useRef<d3.ScaleLinear<number, number, never>>();
  const zoomedXScaleRef = useRef<d3.ScaleTime<Number, number, never>>();

  const drawChart = () => {
    //set up container
    const container: HTMLDivElement | null = containerRef.current;
    if (!container) return;

    // set up canvas
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;

    // set up canvas
    const hoverCanvas: HTMLCanvasElement | null = hoverRef.current;
    if (!hoverCanvas) return;

    //to make chart HD, need device pixel ratio (see MDN page on devicePixelRatio for more info)
    const height = container.clientHeight;
    const width = container.clientWidth;

    //display size
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    hoverCanvas.style.height = `${height}px`;
    hoverCanvas.style.width = `${width}px`;

    //size in memory - accounts for pixel density
    const scale = window.devicePixelRatio;
    canvas.height = Math.floor(height * scale);
    canvas.width = Math.floor(width * scale);
    hoverCanvas.height = Math.floor(height * scale);
    hoverCanvas.width = Math.floor(width * scale);

    //ctx contains tools used to draw on the canvas
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    const hoverCtx: CanvasRenderingContext2D | null =
      hoverCanvas.getContext("2d");
    if (!ctx || !hoverCtx) return;

    //normalize coordinate to use CSS pixel
    ctx.scale(scale, scale);
    hoverCtx.scale(scale, scale);

    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hoverCtx.clearRect(0, 0, canvas.width, canvas.height);

    //set up automatic scaling for x and y axes. Domain for values of the data, range for values of pixel
    const dataArray = data;

    const usableWidth = canvas.width / scale - margin.left - margin.right;
    const usableHeight = canvas.height / scale - margin.top - margin.bottom;

    const candleWidth = ((width * zoomState) / scale / dataArray.length) * 0.3;
    setCandleWidth(candleWidth);
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dataArray, (d) => new Date(d.time)) as [Date, Date])
      .range([margin.left, margin.left + usableWidth]);

    const yHigh = Math.max(...dataArray.map((d) => d.high));
    const yLow = Math.min(...dataArray.map((d) => d.low));
    const yScale = d3
      .scaleLinear()
      .domain([yLow, yHigh])
      .range([usableHeight, margin.top]);
    yScaleRef.current = yScale;

    const zoomedXScale = d3
      .scaleTime()
      .domain(xScale.domain())
      .range([
        panOffset + margin.left,
        usableWidth * zoomState + panOffset + margin.left,
      ]);
    zoomedXScaleRef.current = zoomedXScale;

    //y axis
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, canvas.height / scale - margin.bottom);
    ctx.stroke();

    //x axis
    ctx.beginPath();
    ctx.moveTo(margin.left, canvas.height / scale - margin.bottom);
    ctx.lineTo(
      canvas.width / scale - margin.right,
      canvas.height / scale - margin.bottom
    );
    ctx.stroke();

    //x axis labels
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    const xTicks = zoomedXScale.ticks(5);
    xTicks.forEach((tick) => {
      const time = tick.toLocaleTimeString();
      const xCoord = zoomedXScale(tick);
      const yCoord = canvas.height / scale - margin.bottom / 1.5;
      ctx.fillText(time, xCoord, yCoord);
    });

    //y axis labels
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    const yTicks = yScale.ticks(5);
    yTicks.forEach((tick) => {
      const xCoord = margin.left - 20;
      const yCoord = yScale(tick);
      ctx.fillText(tick.toString(), xCoord, yCoord);
    });

    //candlestick charts
    dataArray.forEach((point) => {
      let xCoord = zoomedXScale(new Date(point.time));

      const open = yScale(point.open);
      const close = yScale(point.close);
      const high = yScale(point.high);
      const low = yScale(point.low);

      //candlestick color
      const candleColor = point.open > point.close ? "#f23645" : "#089981";
      ctx.fillStyle = candleColor;
      ctx.strokeStyle = candleColor;

      //draw wick
      if (
        xCoord > margin.left &&
        xCoord < canvas.width / scale - margin.right
      ) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(xCoord, high);
        ctx.lineTo(xCoord, low);
        ctx.stroke();
      }

      //draw different candle widths depending on how close it is to the left and right borders
      let lineWidth;
      if (
        xCoord + candleWidth / 2 <= margin.left ||
        xCoord - candleWidth / 2 >= canvas.width / scale - margin.right
      ) {
        return;
      } else if (xCoord - candleWidth / 2 <= margin.left) {
        const rightBorder = xCoord + candleWidth / 2;
        lineWidth = rightBorder - margin.left;
        xCoord = margin.left + lineWidth / 2;
      } else if (
        xCoord + candleWidth / 2 >=
        canvas.width / scale - margin.right
      ) {
        const leftBorder = xCoord - candleWidth / 2;
        lineWidth = canvas.width / scale - margin.right - leftBorder;
        xCoord = canvas.width / scale - margin.right - lineWidth / 2;
      } else {
        lineWidth = candleWidth;
      }

      //draw candle
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.moveTo(xCoord, open);
      ctx.lineTo(xCoord, close);
      ctx.stroke();

      //draw arrows
      if (point.action > 0) {
        ctx.beginPath();
        ctx.moveTo(xCoord - 5, low + 10);
        ctx.lineTo(xCoord + 5, low + 10);
        ctx.lineTo(xCoord, low);
        ctx.fillStyle = "#089981";
      } else if (point.action < 0) {
        ctx.beginPath();
        ctx.moveTo(xCoord - 5, high - 10);
        ctx.lineTo(xCoord + 5, high - 10);
        ctx.lineTo(xCoord, high);
        ctx.fillStyle = "#f23645";
        ctx.fill();
      }
    });
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
  });

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setZoomState((prevZoom) =>
      Math.max(1, Math.min(10, prevZoom * (1 - e.deltaY * 0.001)))
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart(e.clientX);

    //change cursor back
    if (hoverRef.current) {
      hoverRef.current.style.cursor = "move";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    //change cursor back
    if (hoverRef.current) {
      hoverRef.current.style.cursor = "crosshair";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const hoverCanvas: HTMLCanvasElement | null = hoverRef.current;
    if (!canvas || !hoverCanvas) return;
    const scale = window.devicePixelRatio;

    //change cursor style
    hoverCanvas.style.cursor = isDragging ? "move" : "crosshair";

    //draw lines and axis labels for current mouse location
    const hoverCtx = hoverCanvas.getContext("2d");
    if (hoverCtx && !isDragging) {
      hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
      const rect = hoverCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      if (
        !(
          mouseX < margin.left ||
          mouseX > hoverCanvas.width / scale - margin.right ||
          mouseY < margin.top ||
          mouseY > hoverCanvas.height / scale - margin.bottom
        )
      ) {
        if (yScaleRef.current && zoomedXScaleRef.current) {
          hoverCtx.fillStyle = "white";
          hoverCtx.font = "15px Arial";
          hoverCtx.textAlign = "center";

          hoverCtx.setLineDash([]);
          hoverCtx.strokeStyle = "#2b2a33";
          hoverCtx.lineWidth = 30;

          //text background - y axis
          hoverCtx.beginPath();
          hoverCtx.moveTo(margin.left - 60, mouseY);
          hoverCtx.lineTo(margin.left - 2, mouseY);
          hoverCtx.stroke();

          //value on y axis
          hoverCtx.textBaseline = "middle";
          hoverCtx.fillText(
            `${yScaleRef.current.invert(mouseY).toFixed(2)}`,
            margin.left - 30,
            mouseY
          );

          //text for x axis
          const xAxisText = zoomedXScaleRef.current
            .invert(mouseX)
            .toLocaleTimeString();
          const textWidth = hoverCtx.measureText(xAxisText).width;

          //text background - x axis
          hoverCtx.beginPath();
          hoverCtx.moveTo(
            mouseX - textWidth / 2 - 10,
            hoverCanvas.height / scale - margin.bottom + 20
          );
          hoverCtx.lineTo(
            mouseX + textWidth / 2 + 10,
            hoverCanvas.height / scale - margin.bottom + 20
          );
          hoverCtx.stroke();

          //value on x axis
          hoverCtx.textBaseline = "ideographic";
          hoverCtx.fillText(
            `${xAxisText}`,
            mouseX,
            hoverCanvas.height / scale - margin.bottom / 1.5
          );
        }

        hoverCtx.beginPath();
        hoverCtx.setLineDash([10, 15]);
        hoverCtx.strokeStyle = "grey";
        hoverCtx.lineWidth = 1;

        //horizontal line
        hoverCtx.moveTo(margin.left, mouseY);
        hoverCtx.lineTo(hoverCanvas.width / scale - margin.right, mouseY);

        //vertical line
        hoverCtx.moveTo(mouseX, margin.top);
        hoverCtx.lineTo(mouseX, hoverCanvas.height / scale - margin.bottom);

        hoverCtx.stroke();
        hoverCtx.closePath();
      }
    }

    //dragging logic
    if (isDragging) {
      const dragDistance = e.clientX - dragStart;
      const canvasWidth = canvas.width / scale - margin.left - margin.right;

      setPanOffset((prevOffset) => {
        let newOffset;

        if (dragDistance >= 0 && prevOffset <= candleWidth / 2) {
          newOffset = Math.min(candleWidth / 2, prevOffset + dragDistance);
        } else if (dragDistance <= 0 && prevOffset <= -candleWidth / 2) {
          newOffset = Math.max(
            -(canvasWidth * zoomState - canvasWidth + candleWidth / 2),
            dragDistance + prevOffset
          );
        } else {
          newOffset = prevOffset + dragDistance;
        }
        return newOffset;
      });

      setDragStart(e.clientX);
    }
  };

  const handleMouseOut = () => {
    const hoverCanvas = hoverRef.current;
    if (!hoverCanvas) return;

    const hoverCtx = hoverCanvas.getContext("2d");
    if (hoverCtx) {
      hoverCtx.clearRect(
        0,
        0,
        hoverCanvas.clientWidth,
        hoverCanvas.clientHeight
      );
    }
  };

  return (
    <div ref={containerRef} className="canvas-container flex-auto w-2/3 flex">
      <canvas ref={canvasRef} className="flex-1"></canvas>
      <canvas
        ref={hoverRef}
        className="flex-1 z-10 absolute"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseOut={handleMouseOut}
      ></canvas>
    </div>
  );
}
