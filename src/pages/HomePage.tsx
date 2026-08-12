import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Future from '../components/Future';
import Contact from '../components/Contact';
import PageBlob from '../components/PageBlob';
import Seo from '../components/Seo';
import { organizationSchema, websiteSchema, localBusinessSchema, mobileAppSchemas } from '../constants/schema';

/**
 * Extracted from App so the route table can live in its own module — a
 * requirement of the static prerender, which imports the routes without
 * pulling in the browser entry point.
 */
const HomePage: React.FC = () => (
  <main className="relative overflow-hidden">
    <PageBlob />

    <Seo
      title="Compare &amp; Book Car Services Online"
      description="Compare prices from verified car workshops near you, book a service in minutes and track it in real time. Keplix brings transparent pricing to car care across India."
      jsonLd={[organizationSchema(), websiteSchema(), localBusinessSchema(), ...mobileAppSchemas()]}
    />
    <Hero />
    <Services />
    <Process />
    <Future />
    <Contact />
  </main>
);

export default HomePage;
