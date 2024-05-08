"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  role: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    role: "CEO",
    name: "Emily Carter",
    comment:
      "Flexnote's notification manager streamlined our sales campaigns brilliantly. Setting up notifications was intuitive, boosting our engagement rates significantly.",
  },
  {
    image: "https://github.com/shadcn.png",
    role: "Marketing Specialist",
    name: "Michael Johnson",
    comment:
      "Since using Flexnote, our customer experience has improved dramatically. We're reaching customers with timely updates and seeing great results in sales!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Sarah Lee",
    role: "Marketing Manager",
    comment:
      "Flexnote made it easy to manage notifications without any technical expertise. It's been essential for our promotional events and has increased our overall efficiency.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "David Smith",
    role: "Content Manager",
    comment:
      "The ability to customize and schedule messages with Flexnote has transformed how we engage our audience. The results? Higher sales and happier customers.",
  },
  {
    image: "https://github.com/shadcn.png",
    role: "Marketeer",
    name: "Laura Garcia",
    comment:
      "Flexnote helped us cut through the complexity of notification management. Its easy setup and robust features helped us connect with our audience more effectively than ever before.",
  },
  {
    image: "https://github.com/shadcn.png",
    role: "E-commerce Manager",
    name: "James Wilson",
    comment:
      "We were missing out on key engagement opportunities before Flexnote. Now, we can easily send out back-in-stock alerts and loyalty updates, which have greatly improved our customer retention.",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-12 sm:py-24">
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          People Use{" "}
        </span>
        Flexnote
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error
        facere hic reiciendis illo
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, comment, role }: TestimonialProps, index) => (
            <Card
              key={index}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {/* <Avatar>
                  <AvatarImage alt="" src={image} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar> */}

                <div className="flex flex-col">
                  <CardTitle className="text-lg">
                    {name} - <span className="text-sm font-light">{role}</span>
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
