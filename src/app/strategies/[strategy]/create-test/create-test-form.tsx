"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { StockSymbol } from "@/lib/constants";
import { postBacktest } from "@/api/strategy";

type FormData = {
  name: string;
  interval: string;
  symbol: string;
  startTime: string;
};

const intervals = [
  { value: "5min", label: "5 Minutes" },
  { value: "15min", label: "15 Minutes" },
  { value: "30min", label: "30 Minutes" },
  { value: "45min", label: "45 Minutes" },
  { value: "1h", label: "1 Hour" },
  { value: "2h", label: "2 Hours" },
  { value: "4h", label: "4 Hours" },
];

export default function CreateTestForm({
  stocks,
  strategyID,
}: {
  stocks: StockSymbol[];
  strategyID: string;
}) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const form = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (form: FormData) => {
    setError(null);
    setLoading(true);
    let resID;

    try {
      console.log(form.startTime);
      const res = await postBacktest(
        form.name,
        strategyID,
        form.interval,
        form.symbol,
        form.startTime
      );

      setIsSubmitted(true);
      resID = res.id;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }

    setLoading(false);
    if (resID) {
      router.push(`/strategies/${strategyID}/${resID}`);
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create a New <span className="text-[#6b27c0]">Backtest</span>
      </h1>
      {isSubmitted && (
        <div className="mt-6 mb-6 p-4 bg-green-100 text-green-700 rounded">
          Backtest created successfully! Please wait while we redirect you to
          your new backtest page...
        </div>
      )}
      {error && (
        <div className="mt-6 mb-6 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backtest Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter backtest name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interval"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interval</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an interval" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {intervals.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Symbol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a stock symbol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stocks &&
                      stocks.slice(0, 100).map((stock) => (
                        <SelectItem key={stock.symbol} value={stock.symbol}>
                          {stock.name} ({stock.symbol})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input required type="datetime-local" {...field} />
                </FormControl>
                <FormDescription>
                  Select the start time for your backtest
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {!loading ? (
            <Button type="submit" className="self-center">
              Create Backtest
            </Button>
          ) : (
            <Button type="submit" className="self-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
