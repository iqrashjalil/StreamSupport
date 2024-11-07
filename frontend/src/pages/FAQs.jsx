import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";

const FAQs = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 font-rajdhani">
      <div className="lg:w-[50%] w-[80%] flex flex-col items-center">
        <h1 className="text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-7xl text-slate-50">
          Frequently Asked <span className="text-redMain">Questions</span>
        </h1>
        <p className="lg:text-lg text-slate-50">
          These are the most commonly asked questions about Stream
          <span className="font-bold text-redMain">Support</span> Can&apos;t
        </p>
        <p className="text-lg text-slate-50">
          {" "}
          find what you&apos;re looking for?{" "}
          <NavLink to={"/contact"} className="underline">
            Chat with our friendly team!
          </NavLink>
        </p>
      </div>
      <div className="w-[80%] lg:w-[50%] mt-4 h-[1px] bg-redMain"></div>
      <div className="lg:w-[50%] w-[80%]  flex flex-col items-center">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-slate-50">
              What is StreamSupport?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              StreamSupport is a platform designed to assist content creators
              with tools and resources to enhance their streaming experience and
              engage audiences effectively.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-slate-50">
              How much does StreamSupport charge?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              StreamSupport charges a 10% fee on earnings generated through the
              platform, covering all platform services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-slate-50">
              How do I get started with StreamSupport?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              Getting started is easy! Just sign up, link your streaming
              accounts, and access tools and features tailored to support your
              growth.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-slate-50">
              Can I integrate StreamSupport with my current streaming platform?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              Yes, StreamSupport integrates with major streaming platforms like
              Twitch, YouTube, and Facebook Live to streamline your workflow.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-slate-50">
              Does StreamSupport offer analytics?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              Yes, StreamSupport provides detailed analytics to help you track
              performance, audience engagement, and growth over time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-slate-50">
              Is StreamSupport mobile-friendly?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              While optimized for desktop, a mobile-friendly version is under
              development to offer flexibility across devices.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-slate-50">
              What payment methods are supported?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              StreamSupport supports a variety of payment methods, including
              direct bank transfers, Mobile Wallets, and other popular options
              for ease of payment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-slate-50">
              Does StreamSupport provide customer support?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              Yes, StreamSupport offers 24/7 customer support to assist with
              technical issues, setup, and general inquiries to help you make
              the most of the platform.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-slate-50">
              Can I track my revenue in real-time?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              Yes, StreamSupport provides real-time revenue tracking so you can
              monitor your earnings from subscriptions, tips, and other streams
              of income.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="text-slate-50">
              How secure is my data on StreamSupport?
            </AccordionTrigger>
            <AccordionContent className="text-slate-50">
              StreamSupport prioritizes data security, using encryption and
              other best practices to ensure your personal and financial data
              are safe.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
