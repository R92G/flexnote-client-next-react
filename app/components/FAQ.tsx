"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Doesn't Flexnote cause too much noise with notifications?",
    answer:
      "Flexnote shows notifications only once per session, to ensure your customers won’t get bothered. This helps maintain a balance between user engagement and user experience.",
    value: "noise-management",
  },
  {
    question: "How does Flexnote integrate with my existing design?",
    answer:
      "Flexnote uses transparency to fit seamlessly into your existing design. It automatically adopts your setup's font color, ensuring it complements your brand’s visual style without requiring extensive configuration.",
    value: "design-integration",
  },
  {
    question: "Is Flexnote easy to use for non-developer business owners?",
    answer:
      "Absolutely! Flexnote is designed with simplicity in mind, making it incredibly easy for non-developers to set up and manage. It requires no technical expertise, allowing you to start engaging with your audience right away.",
    value: "ease-of-use",
  },
  {
    question: "Can Flexnote help increase my sales?",
    answer:
      "Yes, Flexnote can significantly boost your sales by enabling timely and relevant notifications about promotions, new products, or exclusive offers directly to your customers, enhancing the likelihood of conversion.",
    value: "sales-boost",
  },
  {
    question: "What makes Flexnote different from other notification tools?",
    answer:
      "Flexnote stands out due to its user-friendly interface, the efficiency of its notification delivery, and its ability to integrate smoothly into any business’s operations without disrupting existing workflows.",
    value: "unique-features",
  },
];
export const FAQ = () => {
  return (
    <section id="faq" className="container py-12 sm:py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
