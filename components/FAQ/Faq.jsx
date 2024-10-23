import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqArray = [
  {
    question: "What is the frequency at which trends change on Twitter?",
    answer:
      "Twitter trends change frequently, depending on what people are talking about in recent times.",
  },
  {
    question: "Can I create my own Twitter trend?",
    answer:
      "You can make your own Twitter trend by using a special hashtag and asking others to use it in their tweets.",
  },
  {
    question: "Do I need to use hashtags to participate in Twitter trends?",
    answer:
      "Using hashtags can help your tweets be more visible in a particular conversation, but you don’t have to use them to join a Twitter trend.",
  },
  {
    question:
      "How can I use Trends Hashtags to enhance my social media strategy in Worldwide?",
    answer:
      "If you keep an eye on what people in Worldwide are interested in and use popular hashtags, you can make your social media plan better, get more people involved, and connect with them better.",
  },
];

const Faq = () => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="h-full w-full bg-blue-50 shadow-lg p-4 rounded-lg "
      >
        {faqArray.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-md p-3">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-md p-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
