"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { postStrategy } from "@/api/strategies";
import { useRouter } from "next/navigation";
import { getToken, getSession} from "@/utils/requests";

type FormData = {
  strategyName: string;
  tradingStyle: string;
  riskAversion: string;
  markets: string;
};

export default function CreateStrategy() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const form = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    
  const [tokenData, sessionData] = await Promise.all([getToken(), getSession()]);
  console.log("TOKEN PAGE: " + tokenData);
  console.log("SESSION PAGE: " + sessionData);

    try {
      const res = await postStrategy(
        "101007466203640277268",
        data.strategyName,
        "Risk level: " +
          data.riskAversion +
          ". Trading style:" +
          data.tradingStyle +
          ". Markets: " +
          data.markets,
          tokenData,
          sessionData
      );

      setIsSubmitted(true);
      router.push(`/strategies/${res.id}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create Your <span className="text-[#6b27c0]">Strategy</span>
      </h1>
      {isSubmitted && (
        <div className="mt-6 mb-6 p-4 bg-green-100 text-green-700 rounded">
          Strategy submitted successfully!
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
            name="strategyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Strategy Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Name your strategy..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tradingStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  What is your trading style?
                </FormLabel>
                <Accordion type="single" collapsible>
                  <AccordionItem value="sample-trading-style">
                    <AccordionTrigger className="text-sm text-[#6b27c0]">
                      View Sample Answers
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-bold">Day Trading:</span> I prefer
                        day trading because it allows me to capitalize on
                        short-term price movements and avoid overnight risk. I
                        enjoy the excitement and fast pace of executing multiple
                        trades within a single day.
                        <br />
                        <br /> <span className="font-bold">
                          Swing Trading:
                        </span>{" "}
                        I lean towards swing trading as it enables me to hold
                        positions over a few days or weeks, allowing me to
                        capture larger price swings while fitting my schedule
                        better than day trading.
                        <br />
                        <br />
                        <span className="font-bold">Position Trading:</span> I
                        practice position trading because I focus on long-term
                        trends rather than daily fluctuations. This style
                        lessens the stress of frequent trading and aligns with
                        my investment philosophy.
                        <br />
                        <br />
                        <span className="font-bold">Scalping:</span> I engage in
                        scalping as it allows me to make quick trades to profit
                        from minor price changes. I find satisfaction in the
                        speed and agility required for this trading method.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Describe your trading style..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="riskAversion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  How risk averse are you?
                </FormLabel>
                <Accordion type="single" collapsible className="mb-2">
                  <AccordionItem value="sample-risk-aversion">
                    <AccordionTrigger className="text-sm text-[#6b27c0]">
                      View Sample Answer
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-bold">Risk Averse:</span> I
                        consider myself risk averse, which means I only invest a
                        small percentage of my portfolio in higher-risk trades.
                        I prefer strategies that safeguard my capital and
                        provide more stability over potential high returns.{" "}
                        <br />
                        <br />
                        <span className="font-bold">
                          Moderately Risk Averse:
                        </span>
                        I have a moderately risk-averse approach. While I am
                        open to investing in riskier assets, I ensure that the
                        majority of my portfolio is in stable investments and
                        evaluate the risk versus reward carefully.
                        <br />
                        <br />
                        <span className="font-bold">Risk Tolerant:</span>I would
                        describe myself as risk tolerant. I am willing to take
                        calculated risks in trading, as I believe that higher
                        risks can lead to significant rewards. However, I still
                        employ stop-loss orders to manage potential losses.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Describe your risk aversion..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="markets"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  What markets do you plan to trade in and why?
                </FormLabel>
                <Accordion type="single" collapsible className="mb-2">
                  <AccordionItem value="sample-markets">
                    <AccordionTrigger className="text-sm text-[#6b27c0]">
                      View Sample Answer
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-bold">Stocks:</span> I consider
                        myself risk averse, which means I only invest a small
                        percentage of my portfolio in higher-risk trades. I
                        prefer strategies that safeguard my capital and provide
                        more stability over potential high returns. I plan to
                        trade in stocks because they provide a solid opportunity
                        for long-term growth and I can leverage various
                        strategies depending on market conditions.
                        <br />
                        <br />
                        <span className="font-bold">Forex:</span>
                        Trading in forex is appealing due to its high liquidity
                        and the ability to trade 24/5. It offers flexibility and
                        the potential for profit from both rising and falling
                        prices.
                        <br />
                        <br />
                        <span className="font-bold">Commodities:</span>
                        I choose commodities such as gold and oil because they
                        tend to be less volatile than other markets and can act
                        as safe-haven investments during economic uncertainty.
                        <br />
                        <br />
                        <span className="font-bold">Cryptocurrencies:</span>I am
                        interested in trading cryptocurrencies for their
                        potential high returns and the innovative technology
                        behind them, although I am aware of the risks involved
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Describe your target markets and reasons..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!loading ? (
            <Button type="submit" className="self-center">
              Create Strategy
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
