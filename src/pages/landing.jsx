import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import companies from "../data/companies";
import Autoplay from "embla-carousel-autoplay";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex item-center gap-2 sm:gap-6">
            And Get{" "}
            <img
              src="/logo 1.png"
              alt="Hirred Logo"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        <p className="text-grey-300 sm:mt-4 text-xs sm:text-xl">
          Discover thousands of job opportunities or connect with your ideal
          candidates
        </p>
      </section>
      <div className="flex justify-center gap-6">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <img src="./banner.png" alt="banner" className="w-full" />

      <div className="flex gap-6 w-full">
        <Card className="bg-black text-gray-200 rounded-lg shadow-lg p-6 flex-1 hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="text-gray-100 text-xl font-bold mb-4">
              Aspiring Professionals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Find jobs, apply instantly, and track applications effortlessly.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black text-gray-200 rounded-lg shadow-lg p-6 flex-1 hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="text-gray-100 text-xl font-bold mb-4">
              For Recruiters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Post jobs, evaluate candidates, and hire top talent seamlessly.
            </p>
          </CardContent>
        </Card>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
