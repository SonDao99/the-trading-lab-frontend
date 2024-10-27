"use client";

import { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getStrategy, updateStrategy } from "@/api/strategy";

type FormData = {
  strategyName: string;
  prompt: string;
};

export default function EditStrategy({
  params,
}: {
  params: { strategy: string };
}) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [stratName, setStratName] = useState("");
  const form = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    try {
      const getStrategyName = async () => {
        const strategy = await getStrategy(params.strategy);
        setStratName(strategy.strategyName);
      };
      getStrategyName();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setLoading(true);
    let resID;

    try {
      const res = await updateStrategy(
        params.strategy,
        stratName,
        data.prompt,
        "101007466203640277268"
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
      router.push("/strategies");
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Edit Your <span className="text-[#6b27c0]">Strategy</span>
      </h1>
      {isSubmitted && (
        <div className="mt-6 mb-6 p-4 bg-green-100 text-green-700 rounded">
          Strategy submitted successfully! Please wait while we redirect you to
          your new strategy page...
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
            // control={form.control}
            name="strategyName"
            render={() => (
              <FormItem>
                <FormLabel className="text-lg">Strategy Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Name your strategy..."
                    value={stratName}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  How would you like this strategy to be different?
                </FormLabel>
                <FormControl>
                  <Textarea
                    required
                    placeholder="Describe how you would like your strategy to be different in terms of risk level, trading style, markets,..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!loading ? (
            <Button type="submit" className="self-center">
              Edit Strategy
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
