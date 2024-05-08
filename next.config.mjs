// Importeer de withContentlayer functie uit next-contentlayer
import { withContentlayer } from "next-contentlayer";

// Definieer je Next.js configuratie
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
};

// Exporteer de configuratie, verrijkt met Contentlayer
export default withContentlayer(nextConfig);
