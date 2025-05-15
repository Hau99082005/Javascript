import Image from 'next/image';
import React from 'react';

const Entertaiments = () => {
  return (
    <div className='px-4 py-6 bg-[#1d1d1d]'>
       <div className='container'>
         <div className='row'>
            <h2 className='text-center align-align-items-center justify-center uppercase font-semibold text-white'
            style={{fontFamily: "Lato", fontWeight: "bolder"}}>Tất cả các giải trí</h2>
            <p className='text-white align-items-center text-center justify-center font-semibold' style={{fontFamily: "Lato", fontWeight: "lighter", fontSize: "20px"}}>
                Ngoài hệ thống rạp chiếu phim chất lượng cao, Cinestar còn cung cấp cho bạn nhiều loại hình giải trí tuyệt với khác.
            </p>
        <div className="col-md-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="card-body p-0">
          <Image src="/image/img-service0.webp" alt="" width={500} height={700} className="w-full h-[380px] object-cover rounded" />
      </div>
     </div>
    <div className="card">
      <div className="card-body p-0">
        <Image src="/image/img-service1.webp" alt="" width={500} height={700} className="w-full h-[380px] object-cover rounded"/>
      </div>
    </div>
    <div className="card">
      <div className="card-body p-0">
        <Image src="/image/img-service2.webp" alt="" width={500} height={700} className="w-full h-[380px] object-cover rounded" />
      </div>
    </div>
    <div className="card">
      <div className="card-body p-0">
        <Image src="/image/img-service3.webp" alt="" width={500} height={700} className="w-full h-[380px] object-cover rounded"/>
      </div>
    </div>
    <div className="card">
      <div className="card-body p-0">
        <Image src="/image/img-service4.webp" alt="" width={500} height={700} className="w-full h-[380px] object-cover rounded"/>
      </div>
    </div>
    <div className="card">
      <div className="card-body p-0">
        <Image src="/image/img-service5.webp" alt="" width={500} height={700} className="w-full h-[380px] object-cover rounded"/>
         </div>
          </div>
           </div>
          </div>
         </div>
       </div>
    </div>
  );
}

export default Entertaiments;
