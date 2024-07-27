
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { aboutbreadcrumbs } from '@/data/data';
import Image from 'next/image';
import React from 'react';
import aboutimage from '@assets/images/AboutImage.png';
import Mission from '@/components/mission';
import {  testimonialcards } from '@/data';
import Testimonial from '@/components/testimonial/testimonial';
import { IoLogoFirebase } from 'react-icons/io5';
import { GiNightVision } from "react-icons/gi";
import { LuTarget } from "react-icons/lu";



const About= () => {
  return (
    <>
      <TopHero title="About Us" breadcrumbs={aboutbreadcrumbs} />
      
      <Container className="flex flex-wrap md:flex-nowrap items-center md:gap-10 mt-2">
        <div className="w-full md:w-7/12">
          <h2 className="text-14 text-[#999999]">OUR STORY</h2>
          <h1 className="text-[48px]">WELCOME TO AVENUE39</h1>
          <div className="text-14 space-y-4">
            <p>
              Having been established in the UAE for over a decade, the time was
              right to have a division solely focussed on sourcing and buying
              the best pieces of unique, modern furniture for your home. The
              owners are passionate about furnishings and every item selected is
              something worthy of their own homes. Our buyers spend time hand
              testing each and every product.
            </p>
            <p>
              We visit the factories personally to ensure staff welfare. We take
              important steps in speaking to the factory staff to be certain
              that they are treated with respect and dignity and recieving their
              salaries on time. Any factory that doesn&apos;t adhere to our strict
              stipulations are struck off from our supply chain. Every item is
              quality checked before being loaded onto containers bound for our
              warehouse in Dubai.
            </p>
            <p>
              Our team at source are paid bonuses to find faults, making it more
              stringent that goods don&apos;t pass this stage easily. Once the
              products arrive in the UAE, they are once again meticulously
              checked for any flaws or faults.
            </p>
            <p>
              Only then are they assigned a shelf space and available to sell.
              Another unique trait of ours is the Try Before You Buy guarantee.
              This allows you to order any item which we deliver and assemble in
              your home and give you 30 mins to really test and decide if you&apos;re
              satisfied with your selection. If you are, then great. If not, we
              will simply repack the item and refund your money by the next day
              time taken for the money to reach your account varies from bank
              to bank. The TBYB guarantee is available on the majority of items
              on our website. Those items not a part of this guarantee will be
              clearly marked.
            </p>
          </div>
        </div>
        <div className="w-full md:w-5/12 mt-5 md:mt-0">
          <Image
            className="h-full w-full"
            width={500}
            height={500}
            src={aboutimage}
            alt="about"
          />
        </div>
      </Container>
      <div className="bg-gray-100 mt-20 mb-20">
      <Container className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-20 pt-20 pb-20'>
     
          <Mission
            icon={<IoLogoFirebase />}
            title={"Our Value"}
            description={"Every week, millions of savvy customers enjoy the fun and exciting shopping experience of Poundland in hundreds of stores nationwide."}
          />
          <Mission
            icon={<LuTarget />}
            title={"Mission"}
            description={"Our mission to keep commerce human is the guiding principle behind the tangible ways we're working to make a positive impact on our community, our environment and the global economy."}
          />
          <Mission
            icon={<GiNightVision />}
            title={"Our Vision"}
            description={"From Amazing TOP BRANDS and daily ESSENTIAL items, to fantastic NEW lines and stunning WOW deals, we hope our quality and variety gives you irresistible value each visit!"}
          />
      
      </Container>
    </div>
    <Testimonial testimonialitems={testimonialcards} />

    </>
  );
};

export default About