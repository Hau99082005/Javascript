"use client";
import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import Image from 'next/image';
import Container from './Container';

export default function Banner() {
  return (
    <div className="w-full bg-[#1d1d1d]">
    <Container>
    <MDBCarousel showIndicators showControls fade className="rounded-lg shadow-lg overflow-hidden">
        <MDBCarouselItem itemId={1}>
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
            <Image src="/image/banner_web1.jpg" alt="banner_web1" priority fill className="object-cover"/>
          </div>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
            <Image src="/image/banner_web2.jpg" alt="banner_web2" priority fill className="object-cover" />
          </div>
        </MDBCarouselItem>
      </MDBCarousel>
    </Container>
    </div>
  );
}
