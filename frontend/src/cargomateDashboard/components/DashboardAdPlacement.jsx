// // // // // import React, { useEffect, useState } from "react";
// // // // // import API from "../api/axios";

// // // // // const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
// // // // // const getImageUrl = (image) => {
// // // // //   if (!image) return "";
// // // // //   if (/^https?:\/\//i.test(image) || image.startsWith("data:")) return image;
// // // // //   return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// // // // // };

// // // // // /** Displays active ads assigned to the exact Admin Ad Management placement. */
// // // // // export default function DashboardAdPlacement({ location }) {
// // // // //   const [ads, setAds] = useState([]);

// // // // //   useEffect(() => {
// // // // //     if (!location) {
// // // // //       setAds([]);
// // // // //       return undefined;
// // // // //     }
// // // // //     let cancelled = false;
// // // // //     API.get("/ads/placement", { params: { location } })
// // // // //       .then((response) => {
// // // // //         if (!cancelled) setAds(Array.isArray(response.data?.data) ? response.data.data : []);
// // // // //       })
// // // // //       .catch((error) => {
// // // // //         console.error(`[Dashboard ads] Could not load placement: ${location}`, error?.response?.data || error.message);
// // // // //         if (!cancelled) setAds([]);
// // // // //       });
// // // // //     return () => { cancelled = true; };
// // // // //   }, [location]);

// // // // //   if (!ads.length) return null;

// // // // //   return (
// // // // //     <section className="my-4 flex flex-col gap-3" aria-label="Sponsored content">
// // // // //       {ads.map((ad) => {
// // // // //         const imageUrl = getImageUrl(ad.image || ad.imageUrl);
// // // // //         const destination = ad.linkUrl || ad.redirectUrl;
// // // // //         const content = (
// // // // //           <>
// // // // //             {imageUrl && (
// // // // //               <img
// // // // //                 src={imageUrl}
// // // // //                 alt={ad.postText || ad.title || "Sponsored advertisement"}
// // // // //                 loading="lazy"
// // // // //                 className="block max-h-64 w-full object-cover"
// // // // //                 onError={(event) => { event.currentTarget.style.display = "none"; }}
// // // // //               />
// // // // //             )}
// // // // //             <div className="p-4">
// // // // //               {ad.postText && <p className="whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-900">{ad.postText}</p>}
// // // // //               {ad.subPostText && <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-600">{ad.subPostText}</p>}
// // // // //               {destination && <span className="mt-3 inline-flex text-xs font-semibold text-blue-700">Learn more ↗</span>}
// // // // //             </div>
// // // // //           </>
// // // // //         );
// // // // //         return destination ? (
// // // // //           <a key={ad._id} href={destination} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
// // // // //             {content}
// // // // //           </a>
// // // // //         ) : (
// // // // //           <article key={ad._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">{content}</article>
// // // // //         );
// // // // //       })}
// // // // //     </section>
// // // // //   );
// // // // // }

// // // // import React, { useEffect, useMemo, useState } from "react";
// // // // import API from "../api/axios";

// // // // const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

// // // // const getImageUrl = (image) => {
// // // //   if (!image) return "";
// // // //   if (/^https?:\/\//i.test(image) || image.startsWith("data:")) return image;
// // // //   return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// // // // };

// // // // /**
// // // //  * Displays ads assigned to an exact Admin Ad Management placement.
// // // //  * One ad is visible per placement; multiple active ads rotate automatically.
// // // //  * Use two placements on a page (e.g. sidebar + banner) to keep the visible
// // // //  * ad count capped at two while retaining a fixed layout.
// // // //  */
// // // // export default function DashboardAdPlacement({
// // // //   location,
// // // //   layout = "stack",
// // // //   slot = "default",
// // // //   intervalMs = 5000,
// // // // }) {
// // // //   const [ads, setAds] = useState([]);
// // // //   const [activeIndex, setActiveIndex] = useState(0);

// // // //   useEffect(() => {
// // // //     if (!location) {
// // // //       setAds([]);
// // // //       return undefined;
// // // //     }

// // // //     let cancelled = false;
// // // //     API.get("/ads/placement", { params: { location } })
// // // //       .then((response) => {
// // // //         if (cancelled) return;
// // // //         const result = Array.isArray(response.data?.data) ? response.data.data : [];
// // // //         setAds(result);
// // // //         setActiveIndex(slot === "banner" && result.length > 1 ? 1 : 0);
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error(
// // // //           `[Dashboard ads] Could not load placement: ${location}`,
// // // //           error?.response?.data || error.message,
// // // //         );
// // // //         if (!cancelled) setAds([]);
// // // //       });

// // // //     return () => {
// // // //       cancelled = true;
// // // //     };
// // // //   }, [location, slot]);

// // // //   const rotationKey = useMemo(() => `${location || ""}:${slot}`, [location, slot]);

// // // //   useEffect(() => {
// // // //     if (ads.length < 2) return undefined;
// // // //     const timer = window.setInterval(() => {
// // // //       setActiveIndex((current) => (current + 1) % ads.length);
// // // //     }, intervalMs);
// // // //     return () => window.clearInterval(timer);
// // // //   }, [ads.length, intervalMs, rotationKey]);

// // // //   if (!ads.length) return null;

// // // //   const ad = ads[activeIndex % ads.length];
// // // //   const imageUrl = getImageUrl(ad.image || ad.imageUrl || ad.bannerImage);
// // // //   const destination = ad.linkUrl || ad.redirectUrl || ad.targetUrl;
// // // //   const isBanner = layout === "banner";
// // // //   const isSidebar = layout === "sidebar";

// // // //   const cardClass = isBanner
// // // //     ? "flex w-full flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
// // // //     : "block w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md";

// // // //   const imageClass = isBanner
// // // //     ? "block h-36 sm:h-40 w-full sm:w-2/5 lg:w-1/3 shrink-0 object-cover"
// // // //     : isSidebar
// // // //       ? "block h-28 w-full object-cover"
// // // //       : "block h-28 sm:h-32 w-full object-cover";

// // // //   const content = (
// // // //     <>
// // // //       {imageUrl && (
// // // //         <img
// // // //           key={`${ad._id || activeIndex}-image`}
// // // //           src={imageUrl}
// // // //           alt={ad.postText || ad.title || "Sponsored advertisement"}
// // // //           loading="lazy"
// // // //           className={imageClass}
// // // //           onError={(event) => {
// // // //             event.currentTarget.style.display = "none";
// // // //           }}
// // // //         />
// // // //       )}
// // // //       <div className={`min-w-0 p-4 ${isBanner ? "flex flex-1 flex-col justify-center" : ""}`}>
// // // //         {ad.title && <p className="text-sm font-bold leading-5 text-slate-900">{ad.title}</p>}
// // // //         {ad.postText && (
// // // //           <p className={`${ad.title ? "mt-1" : ""} whitespace-pre-wrap break-words text-sm font-semibold leading-5 text-slate-900`}>
// // // //             {ad.postText}
// // // //           </p>
// // // //         )}
// // // //         {ad.subPostText && (
// // // //           <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">
// // // //             {ad.subPostText}
// // // //           </p>
// // // //         )}
// // // //         {destination && <span className="mt-3 inline-flex text-xs font-semibold text-blue-700">Learn more ↗</span>}
// // // //       </div>
// // // //     </>
// // // //   );

// // // //   return (
// // // //     <section className={`${isBanner ? "my-5" : "my-0"} min-w-0 w-full`} aria-label="Sponsored content">
// // // //       {destination ? (
// // // //         <a key={`${rotationKey}-${ad._id || activeIndex}`} href={destination} target="_blank" rel="noopener noreferrer" className={cardClass}>
// // // //           {content}
// // // //         </a>
// // // //       ) : (
// // // //         <article key={`${rotationKey}-${ad._id || activeIndex}`} className={cardClass}>
// // // //           {content}
// // // //         </article>
// // // //       )}
// // // //       {ads.length > 1 && (
// // // //         <div className={`mt-2 flex items-center gap-1.5 ${isBanner ? "justify-center" : "justify-center"}`} aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}>
// // // //           {ads.map((item, index) => (
// // // //             <button
// // // //               key={item._id || index}
// // // //               type="button"
// // // //               aria-label={`Show advertisement ${index + 1}`}
// // // //               aria-current={index === activeIndex ? "true" : undefined}
// // // //               onClick={() => setActiveIndex(index)}
// // // //               className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-teal-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
// // // //             />
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </section>
// // // //   );
// // // // }

// // // import React, { useEffect, useMemo, useState } from "react";
// // // import API from "../api/axios";

// // // const API_ORIGIN = (
// // //   import.meta.env.VITE_API_URL || "http://localhost:8000/api"
// // // ).replace(/\/api\/?$/, "");

// // // const getImageUrl = (image) => {
// // //   if (!image || typeof image !== "string") return "";

// // //   if (/^https?:\/\//i.test(image) || image.startsWith("data:")) {
// // //     return image;
// // //   }

// // //   return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// // // };

// // // /**
// // //  * Displays active ads assigned to an exact Admin Ad Management placement.
// // //  *
// // //  * banner  = full-background image with overlay text
// // //  * sidebar = compact vertical advertisement
// // //  * stack   = standard image card
// // //  *
// // //  * Multiple ads rotate automatically without rendering them all together.
// // //  */
// // // export default function DashboardAdPlacement({
// // //   location,
// // //   layout = "stack",
// // //   slot = "default",
// // //   intervalMs = 5000,
// // // }) {
// // //   const [ads, setAds] = useState([]);
// // //   const [activeIndex, setActiveIndex] = useState(0);
// // //   const [imageFailed, setImageFailed] = useState(false);

// // //   const rotationKey = useMemo(
// // //     () => `${location || ""}:${slot}`,
// // //     [location, slot]
// // //   );

// // //   // Load ads assigned to this exact admin placement.
// // //   useEffect(() => {
// // //     if (!location) {
// // //       setAds([]);
// // //       setActiveIndex(0);
// // //       return undefined;
// // //     }

// // //     let cancelled = false;

// // //     API.get("/ads/placement", {
// // //       params: { location },
// // //     })
// // //       .then((response) => {
// // //         if (cancelled) return;

// // //         const result = Array.isArray(response.data?.data)
// // //           ? response.data.data
// // //           : [];

// // //         setAds(result);
// // //         setActiveIndex(0);
// // //         setImageFailed(false);
// // //       })
// // //       .catch((error) => {
// // //         console.error(
// // //           `[Dashboard ads] Could not load placement: ${location}`,
// // //           error?.response?.data || error.message
// // //         );

// // //         if (!cancelled) {
// // //           setAds([]);
// // //           setActiveIndex(0);
// // //         }
// // //       });

// // //     return () => {
// // //       cancelled = true;
// // //     };
// // //   }, [location]);

// // //   // Rotate ads automatically.
// // //   useEffect(() => {
// // //     if (ads.length < 2) return undefined;

// // //     const timer = window.setInterval(() => {
// // //       setActiveIndex((current) => (current + 1) % ads.length);
// // //       setImageFailed(false);
// // //     }, Math.max(intervalMs, 1000));

// // //     return () => window.clearInterval(timer);
// // //   }, [ads.length, intervalMs, rotationKey]);

// // //   // Reset failed image state whenever the active advertisement changes.
// // //   useEffect(() => {
// // //     setImageFailed(false);
// // //   }, [activeIndex, location]);

// // //   if (!ads.length) return null;

// // //   const ad = ads[activeIndex % ads.length];

// // //   const imageUrl = getImageUrl(
// // //     ad.image || ad.imageUrl || ad.bannerImage
// // //   );

// // //   const destination = (
// // //     ad.linkUrl ||
// // //     ad.redirectUrl ||
// // //     ad.targetUrl ||
// // //     ""
// // //   ).trim();

// // //   const isBanner = layout === "banner";
// // //   const isSidebar = layout === "sidebar";

// // //   const Wrapper = destination ? "a" : "article";

// // //   const wrapperProps = destination
// // //     ? {
// // //         href: destination,
// // //         target: "_blank",
// // //         rel: "noopener noreferrer",
// // //       }
// // //     : {};

// // //   const image = imageUrl && !imageFailed ? (
// // //     <img
// // //       key={`${ad._id || activeIndex}-${imageUrl}`}
// // //       src={imageUrl}
// // //       alt={ad.title || ad.postText || "Sponsored advertisement"}
// // //       loading="lazy"
// // //       onError={() => setImageFailed(true)}
// // //       className={
// // //         isBanner
// // //           ? "absolute inset-0 h-full w-full object-cover"
// // //           : isSidebar
// // //           ? "block h-32 w-full object-cover"
// // //           : "block h-28 sm:h-32 w-full object-cover"
// // //       }
// // //     />
// // //   ) : null;

// // //   const title = ad.title;
// // //   const postText = ad.postText;
// // //   const subPostText = ad.subPostText;

// // //   // Full-width banner: background image + text overlay.
// // //   if (isBanner) {
// // //     return (
// // //       <section
// // //         className="my-5 min-w-0 w-full"
// // //         aria-label="Sponsored content"
// // //       >
// // //         <Wrapper
// // //           key={`${rotationKey}-${ad._id || activeIndex}`}
// // //           {...wrapperProps}
// // //           className="
// // //             group relative isolate block min-h-[150px] w-full
// // //             overflow-hidden rounded-xl border border-slate-200
// // //             bg-slate-950 shadow-sm transition-shadow duration-300
// // //             hover:shadow-lg
// // //             sm:min-h-[170px] md:min-h-[190px] lg:min-h-[210px]
// // //           "
// // //         >
// // //           {image}

// // //           {/* Keep the background dark enough for readable text. */}
// // //           <div
// // //             className="
// // //               absolute inset-0
// // //               bg-gradient-to-r
// // //               from-slate-950/95 via-slate-950/65
// // //               to-slate-950/10
// // //             "
// // //           />

// // //           {/* Subtle overlay for readability across the banner. */}
// // //           <div className="absolute inset-0 bg-slate-950/10" />

// // //           <div
// // //             className="
// // //               relative z-10 flex min-h-[150px] w-full
// // //               flex-col items-start justify-center
// // //               px-5 py-5 text-white
// // //               sm:min-h-[170px] sm:px-8
// // //               md:min-h-[190px] md:px-10
// // //               lg:min-h-[210px]
// // //             "
// // //           >
// // //             {title && (
// // //               <h3 className="max-w-2xl text-base font-bold leading-snug sm:text-lg md:text-2xl">
// // //                 {title}
// // //               </h3>
// // //             )}

// // //             {postText && (
// // //               <p
// // //                 className={`
// // //                   max-w-2xl whitespace-pre-wrap break-words
// // //                   text-sm font-semibold leading-5 text-white
// // //                   sm:text-base
// // //                   ${title ? "mt-2" : ""}
// // //                 `}
// // //               >
// // //                 {postText}
// // //               </p>
// // //             )}

// // //             {subPostText && (
// // //               <p className="mt-2 max-w-xl whitespace-pre-wrap break-words text-xs leading-5 text-white/85 sm:text-sm">
// // //                 {subPostText}
// // //               </p>
// // //             )}

// // //             {destination && (
// // //               <span
// // //                 className="
// // //                   mt-4 inline-flex items-center gap-1.5
// // //                   rounded-md bg-white px-4 py-2
// // //                   text-xs font-semibold text-slate-900
// // //                   transition-colors group-hover:bg-teal-50
// // //                 "
// // //               >
// // //                 Learn more <span aria-hidden="true">↗</span>
// // //               </span>
// // //             )}
// // //           </div>
// // //         </Wrapper>

// // //         {ads.length > 1 && (
// // //           <div
// // //             className="mt-2 flex justify-center gap-1.5"
// // //             aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}
// // //           >
// // //             {ads.map((item, index) => (
// // //               <button
// // //                 key={item._id || index}
// // //                 type="button"
// // //                 aria-label={`Show advertisement ${index + 1}`}
// // //                 aria-current={index === activeIndex ? "true" : undefined}
// // //                 onClick={() => {
// // //                   setActiveIndex(index);
// // //                   setImageFailed(false);
// // //                 }}
// // //                 className={`
// // //                   h-1.5 rounded-full transition-all
// // //                   ${
// // //                     index === activeIndex
// // //                       ? "w-5 bg-teal-600"
// // //                       : "w-1.5 bg-slate-300 hover:bg-slate-400"
// // //                   }
// // //                 `}
// // //               />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </section>
// // //     );
// // //   }

// // //   // Standard and sidebar advertisements.
// // //   return (
// // //     <section
// // //       className="my-0 min-w-0 w-full"
// // //       aria-label="Sponsored content"
// // //     >
// // //       <Wrapper
// // //         key={`${rotationKey}-${ad._id || activeIndex}`}
// // //         {...wrapperProps}
// // //         className="
// // //           group block w-full overflow-hidden rounded-xl
// // //           border border-slate-200 bg-white shadow-sm
// // //           transition-shadow hover:shadow-md
// // //         "
// // //       >
// // //         {image}

// // //         <div className="min-w-0 p-4">
// // //           {title && (
// // //             <p className="break-words text-sm font-bold leading-5 text-slate-900">
// // //               {title}
// // //             </p>
// // //           )}

// // //           {postText && (
// // //             <p
// // //               className={`
// // //                 whitespace-pre-wrap break-words text-sm
// // //                 font-semibold leading-5 text-slate-900
// // //                 ${title ? "mt-1" : ""}
// // //               `}
// // //             >
// // //               {postText}
// // //             </p>
// // //           )}

// // //           {subPostText && (
// // //             <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">
// // //               {subPostText}
// // //             </p>
// // //           )}

// // //           {destination && (
// // //             <span className="mt-3 inline-flex text-xs font-semibold text-blue-700">
// // //               Learn more ↗
// // //             </span>
// // //           )}
// // //         </div>
// // //       </Wrapper>

// // //       {ads.length > 1 && (
// // //         <div
// // //           className="mt-2 flex justify-center gap-1.5"
// // //           aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}
// // //         >
// // //           {ads.map((item, index) => (
// // //             <button
// // //               key={item._id || index}
// // //               type="button"
// // //               aria-label={`Show advertisement ${index + 1}`}
// // //               aria-current={index === activeIndex ? "true" : undefined}
// // //               onClick={() => {
// // //                 setActiveIndex(index);
// // //                 setImageFailed(false);
// // //               }}
// // //               className={`
// // //                 h-1.5 rounded-full transition-all
// // //                 ${
// // //                   index === activeIndex
// // //                     ? "w-5 bg-teal-600"
// // //                     : "w-1.5 bg-slate-300 hover:bg-slate-400"
// // //                 }
// // //               `}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // }


// // // import React, { useEffect, useState } from "react";
// // // import API from "../api/axios";

// // // const API_ORIGIN = (
// // //   import.meta.env.VITE_API_URL || "http://localhost:8000/api"
// // // ).replace(/\/api\/?$/, "");

// // // const getImageUrl = (image) => {
// // //   if (!image || typeof image !== "string") return "";

// // //   if (/^(https?:\/\/|data:|blob:)/i.test(image)) {
// // //     return image;
// // //   }

// // //   return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// // // };

// // // export default function DashboardAdPlacement({
// // //   location,
// // //   layout = "stack",
// // //   slot = "default",
// // //   intervalMs = 5000,
// // // }) {
// // //   const [ads, setAds] = useState([]);
// // //   const [activeIndex, setActiveIndex] = useState(0);
// // //   const [failedImages, setFailedImages] = useState({});

// // //   useEffect(() => {
// // //     if (!location) {
// // //       setAds([]);
// // //       return undefined;
// // //     }

// // //     let cancelled = false;

// // //     const loadAds = async () => {
// // //       try {
// // //         const response = await API.get("/ads/placement", {
// // //           params: { location },
// // //         });

// // //         if (cancelled) return;

// // //         const result = Array.isArray(response.data?.data)
// // //           ? response.data.data
// // //           : [];

// // //         setAds(result);
// // //         setActiveIndex(0);
// // //         setFailedImages({});
// // //       } catch (error) {
// // //         console.error(
// // //           `[Dashboard ads] Failed to load: ${location}`,
// // //           error?.response?.data || error.message
// // //         );

// // //         if (!cancelled) {
// // //           setAds([]);
// // //           setActiveIndex(0);
// // //         }
// // //       }
// // //     };

// // //     loadAds();

// // //     return () => {
// // //       cancelled = true;
// // //     };
// // //   }, [location, slot]);

// // //   useEffect(() => {
// // //     if (ads.length < 2) return undefined;

// // //     const timer = window.setInterval(() => {
// // //       setActiveIndex((current) => (current + 1) % ads.length);
// // //     }, Math.max(1000, intervalMs));

// // //     return () => window.clearInterval(timer);
// // //   }, [ads.length, intervalMs]);

// // //   if (!ads.length) return null;

// // //   const activeAd = ads[activeIndex % ads.length];

// // //   const imageUrl = getImageUrl(
// // //     activeAd.image ||
// // //       activeAd.imageUrl ||
// // //       activeAd.bannerImage
// // //   );

// // //   const destination =
// // //     activeAd.linkUrl ||
// // //     activeAd.redirectUrl ||
// // //     activeAd.targetUrl;

// // //   const isBanner = layout === "banner";
// // //   const isSidebar = layout === "sidebar";

// // //   const imageFailed = Boolean(
// // //     failedImages[activeAd._id || activeIndex]
// // //   );

// // //   const cardClass = isBanner
// // //     ? "relative isolate flex min-h-[150px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm transition hover:shadow-md sm:min-h-[170px]"
// // //     : "relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md";

// // //   const imageClass = isBanner
// // //     ? "absolute inset-0 z-0 h-full w-full object-cover"
// // //     : isSidebar
// // //       ? "block h-28 w-full object-cover"
// // //       : "block h-28 w-full object-cover sm:h-32";

// // //   const content = (
// // //     <>
// // //       {imageUrl && !imageFailed && (
// // //         <img
// // //           key={`${activeAd._id || activeIndex}-image`}
// // //           src={imageUrl}
// // //           alt={
// // //             activeAd.title ||
// // //             activeAd.postText ||
// // //             "Sponsored advertisement"
// // //           }
// // //           loading="lazy"
// // //           className={imageClass}
// // //           onError={() => {
// // //             setFailedImages((previous) => ({
// // //               ...previous,
// // //               [activeAd._id || activeIndex]: true,
// // //             }));
// // //           }}
// // //         />
// // //       )}

// // //       <div
// // //         className={
// // //           isBanner
// // //             ? "relative z-10 flex min-h-[150px] w-full flex-col items-start justify-center bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/10 p-5 sm:min-h-[170px] sm:p-7"
// // //             : "relative z-10 min-w-0 p-4"
// // //         }
// // //       >
// // //         {activeAd.title && (
// // //           <h3
// // //             className={
// // //               isBanner
// // //                 ? "max-w-2xl text-base font-bold leading-6 text-white sm:text-xl"
// // //                 : "break-words text-sm font-bold leading-5 text-slate-900"
// // //             }
// // //           >
// // //             {activeAd.title}
// // //           </h3>
// // //         )}

// // //         {activeAd.postText && (
// // //           <p
// // //             className={`whitespace-pre-wrap break-words ${
// // //               isBanner
// // //                 ? "mt-1 max-w-2xl text-sm font-semibold leading-5 text-white sm:text-base"
// // //                 : `${activeAd.title ? "mt-1" : ""} text-sm font-semibold leading-5 text-slate-900`
// // //             }`}
// // //           >
// // //             {activeAd.postText}
// // //           </p>
// // //         )}

// // //         {activeAd.subPostText && (
// // //           <p
// // //             className={`mt-1 max-w-2xl whitespace-pre-wrap break-words text-xs leading-5 ${
// // //               isBanner ? "text-white/90" : "text-slate-600"
// // //             }`}
// // //           >
// // //             {activeAd.subPostText}
// // //           </p>
// // //         )}

// // //         {destination && (
// // //           <span
// // //             className={`mt-3 inline-flex text-xs font-semibold ${
// // //               isBanner
// // //                 ? "text-white underline underline-offset-4"
// // //                 : "text-blue-700"
// // //             }`}
// // //           >
// // //             Learn more ↗
// // //           </span>
// // //         )}
// // //       </div>
// // //     </>
// // //   );

// // //   return (
// // //     <section
// // //       className={`w-full min-w-0 ${
// // //         isBanner ? "my-5" : "my-0"
// // //       }`}
// // //       aria-label="Sponsored content"
// // //     >
// // //       {destination ? (
// // //         <a
// // //           key={`${activeAd._id || activeIndex}-link`}
// // //           href={destination}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           className={cardClass}
// // //         >
// // //           {content}
// // //         </a>
// // //       ) : (
// // //         <article
// // //           key={`${activeAd._id || activeIndex}-article`}
// // //           className={cardClass}
// // //         >
// // //           {content}
// // //         </article>
// // //       )}

// // //       {ads.length > 1 && (
// // //         <div
// // //           className="mt-2 flex items-center justify-center gap-1.5"
// // //           aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}
// // //         >
// // //           {ads.map((ad, index) => (
// // //             <button
// // //               key={ad._id || index}
// // //               type="button"
// // //               aria-label={`Show advertisement ${index + 1}`}
// // //               aria-current={
// // //                 index === activeIndex ? "true" : undefined
// // //               }
// // //               onClick={() => setActiveIndex(index)}
// // //               className={`h-1.5 rounded-full transition-all ${
// // //                 index === activeIndex
// // //                   ? "w-5 bg-teal-600"
// // //                   : "w-1.5 bg-slate-300 hover:bg-slate-400"
// // //               }`}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import API from "../api/axios";

// // const API_ORIGIN = (
// //   import.meta.env.VITE_API_URL || "http://localhost:8000/api"
// // ).replace(/\/api\/?$/, "");

// // const getImageUrl = (image) => {
// //   if (!image || typeof image !== "string") return "";

// //   if (/^(https?:\/\/|data:|blob:)/i.test(image)) {
// //     return image;
// //   }

// //   return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// // };

// // export default function DashboardAdPlacement({
// //   location,
// //   layout = "stack",
// //   slot = "default",
// //   intervalMs = 5000,
// // }) {
// //   const [ads, setAds] = useState([]);
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [failedImages, setFailedImages] = useState({});

// //   useEffect(() => {
// //     if (!location) {
// //       setAds([]);
// //       return undefined;
// //     }

// //     let cancelled = false;

// //     const loadAds = async () => {
// //       try {
// //         const response = await API.get("/ads/placement", {
// //           params: { location },
// //         });

// //         if (cancelled) return;

// //         const results = Array.isArray(response.data?.data)
// //           ? response.data.data
// //           : [];

// //         setAds(results);
// //         setActiveIndex(0);
// //         setFailedImages({});
// //       } catch (error) {
// //         console.error(
// //           `[Dashboard ads] Failed to load: ${location}`,
// //           error?.response?.data || error.message
// //         );

// //         if (!cancelled) {
// //           setAds([]);
// //           setActiveIndex(0);
// //         }
// //       }
// //     };

// //     loadAds();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [location, slot]);

// //   useEffect(() => {
// //     if (ads.length < 2) return undefined;

// //     const timer = window.setInterval(() => {
// //       setActiveIndex((current) => (current + 1) % ads.length);
// //     }, Math.max(1000, intervalMs));

// //     return () => window.clearInterval(timer);
// //   }, [ads.length, intervalMs]);

// //   if (!ads.length) return null;

// //   const ad = ads[activeIndex % ads.length];

// //   const imageUrl = getImageUrl(
// //     ad.image || ad.imageUrl || ad.bannerImage
// //   );

// //   const destination =
// //     ad.linkUrl || ad.redirectUrl || ad.targetUrl;

// //   const isBanner = layout === "banner";
// //   const imageFailed = Boolean(
// //     failedImages[ad._id || activeIndex]
// //   );

// //   const bannerStyle = {
// //     backgroundImage:
// //       imageUrl && !imageFailed
// //         ? `linear-gradient(90deg, rgba(2, 12, 30, 0.94) 0%, rgba(2, 12, 30, 0.76) 45%, rgba(2, 12, 30, 0.12) 100%), url("${imageUrl}")`
// //         : "linear-gradient(110deg, #07172e, #075985, #0f766e)",
// //     backgroundSize: "cover",
// //     backgroundPosition: "center",
// //     backgroundRepeat: "no-repeat",
// //   };

// //   const content = (
// //     <div
// //       key={ad._id || activeIndex}
// //       className={
// //         isBanner
// //           ? "relative flex min-h-[150px] w-full min-w-0 items-center overflow-hidden rounded-xl sm:min-h-[175px] lg:min-h-[190px]"
// //           : "relative w-full min-w-0 overflow-hidden rounded-xl"
// //       }
// //       style={isBanner ? bannerStyle : undefined}
// //     >
// //       {!isBanner && imageUrl && !imageFailed && (
// //         <img
// //           src={imageUrl}
// //           alt={ad.title || "Sponsored advertisement"}
// //           loading="lazy"
// //           className="block h-28 w-full object-cover sm:h-32"
// //           onError={() =>
// //             setFailedImages((prev) => ({
// //               ...prev,
// //               [ad._id || activeIndex]: true,
// //             }))
// //           }
// //         />
// //       )}

// //       <div
// //         className={
// //           isBanner
// //             ? "relative z-10 flex w-full min-w-0 flex-col items-start justify-center px-5 py-6 sm:px-8 lg:px-10"
// //             : "min-w-0 p-4"
// //         }
// //       >
// //         <span
// //           className={
// //             isBanner
// //               ? "mb-2 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-200 backdrop-blur-sm"
// //               : "hidden"
// //           }
// //         >
// //           Sponsored
// //         </span>

// //         {ad.title && (
// //           <h3
// //             className={
// //               isBanner
// //                 ? "max-w-2xl break-words text-lg font-bold leading-tight text-white sm:text-2xl lg:text-3xl"
// //                 : "break-words text-sm font-bold text-slate-900"
// //             }
// //           >
// //             {ad.title}
// //           </h3>
// //         )}

// //         {ad.postText && (
// //           <p
// //             className={
// //               isBanner
// //                 ? "mt-2 max-w-2xl whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-white sm:text-base"
// //                 : "mt-1 whitespace-pre-wrap break-words text-sm font-semibold leading-5 text-slate-900"
// //             }
// //           >
// //             {ad.postText}
// //           </p>
// //         )}

// //         {ad.subPostText && (
// //           <p
// //             className={
// //               isBanner
// //                 ? "mt-2 max-w-xl whitespace-pre-wrap break-words text-xs leading-5 text-slate-200 sm:text-sm"
// //                 : "mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600"
// //             }
// //           >
// //             {ad.subPostText}
// //           </p>
// //         )}

// //         {destination && (
// //           <span
// //             className={
// //               isBanner
// //                 ? "mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-teal-400 sm:text-sm"
// //                 : "mt-3 inline-flex text-xs font-semibold text-blue-700"
// //             }
// //           >
// //             Learn more <span aria-hidden="true">↗</span>
// //           </span>
// //         )}
// //       </div>

// //       {isBanner && imageUrl && !imageFailed && (
// //         <img
// //           src={imageUrl}
// //           alt=""
// //           aria-hidden="true"
// //           className="hidden"
// //           onError={() =>
// //             setFailedImages((prev) => ({
// //               ...prev,
// //               [ad._id || activeIndex]: true,
// //             }))
// //           }
// //         />
// //       )}
// //     </div>
// //   );

// //   return (
// //     <section
// //       className={`w-full min-w-0 ${
// //         isBanner ? "my-5" : "my-0"
// //       }`}
// //       aria-label="Sponsored content"
// //     >
// //       <div className="w-full min-w-0 overflow-hidden rounded-xl">
// //         {destination ? (
// //           <a
// //             key={`${ad._id || activeIndex}-link`}
// //             href={destination}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// //           >
// //             {content}
// //           </a>
// //         ) : (
// //           <article className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
// //             {content}
// //           </article>
// //         )}
// //       </div>

// //       {ads.length > 1 && (
// //         <div
// //           className="mt-2 flex items-center justify-center gap-2"
// //           aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}
// //         >
// //           {ads.map((item, index) => (
// //             <button
// //               key={item._id || index}
// //               type="button"
// //               aria-label={`Show advertisement ${index + 1}`}
// //               aria-current={index === activeIndex ? "true" : undefined}
// //               onClick={() => setActiveIndex(index)}
// //               className={`h-1.5 rounded-full transition-all ${
// //                 index === activeIndex
// //                   ? "w-6 bg-teal-600"
// //                   : "w-1.5 bg-slate-300 hover:bg-slate-400"
// //               }`}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </section>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import API from "../api/axios";

// const API_ORIGIN = (
//   import.meta.env.VITE_API_URL || "http://localhost:8000/api"
// ).replace(/\/api\/?$/, "");

// const getImageUrl = (image) => {
//   if (!image || typeof image !== "string") return "";
//   if (/^(https?:\/\/|data:|blob:)/i.test(image)) return image;
//   return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// };

// export default function DashboardAdPlacement({
//   location,
//   layout = "stack",
//   slot = "default",
//   intervalMs = 5000,
// }) {
//   const [ads, setAds] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [failedImages, setFailedImages] = useState({});

//   useEffect(() => {
//     if (!location) {
//       setAds([]);
//       setActiveIndex(0);
//       return undefined;
//     }

//     let cancelled = false;

//     const loadAds = async () => {
//       try {
//         const response = await API.get("/ads/placement", {
//           params: { location },
//         });

//         if (cancelled) return;
//         const results = Array.isArray(response.data?.data)
//           ? response.data.data
//           : [];

//         setAds(results);
//         setActiveIndex(0);
//         setFailedImages({});
//       } catch (error) {
//         console.error(
//           `[Dashboard ads] Failed to load: ${location}`,
//           error?.response?.data || error.message
//         );
//         if (!cancelled) {
//           setAds([]);
//           setActiveIndex(0);
//         }
//       }
//     };

//     loadAds();
//     return () => {
//       cancelled = true;
//     };
//   }, [location, slot]);

//   useEffect(() => {
//     if (ads.length < 2) return undefined;

//     const timer = window.setInterval(() => {
//       setActiveIndex((current) => (current + 1) % ads.length);
//     }, Math.max(1000, intervalMs));

//     return () => window.clearInterval(timer);
//   }, [ads.length, intervalMs]);

//   if (!ads.length) return null;

//   const ad = ads[activeIndex % ads.length];
//   const imageUrl = getImageUrl(ad.image || ad.imageUrl || ad.bannerImage);
//   const destination = (ad.linkUrl || ad.redirectUrl || ad.targetUrl || "").trim();
//   const isBanner = layout === "banner";
//   const isSidebar = layout === "sidebar";
//   const imageFailed = Boolean(failedImages[ad._id || activeIndex]);
//   const hasImage = Boolean(imageUrl && !imageFailed);

//   const heightClass = isBanner
//     ? "min-h-[180px] sm:min-h-[210px] lg:min-h-[240px]"
//     : isSidebar
//       ? "min-h-[150px] sm:min-h-[170px]"
//       : "min-h-[180px] sm:min-h-[210px]";

//   const backgroundStyle = hasImage
//     ? {
//         backgroundImage: `linear-gradient(90deg, rgba(2, 12, 30, 0.92) 0%, rgba(2, 12, 30, 0.66) 52%, rgba(2, 12, 30, 0.20) 100%), url("${imageUrl}")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }
//     : {
//         backgroundImage:
//           "linear-gradient(115deg, #07172e 0%, #075985 58%, #0f766e 100%)",
//       };

//   const content = (
//     <div
//       key={ad._id || activeIndex}
//       className={`group relative isolate flex w-full min-w-0 items-center overflow-hidden rounded-xl ${heightClass} ${
//         isBanner ? "shadow-md" : "shadow-sm transition-shadow duration-300 hover:shadow-lg"
//       }`}
//       style={backgroundStyle}
//     >
//       {/* Keep a real image element for accessibility and reliable image-error handling. */}
//       {hasImage && (
//         <img
//           src={imageUrl}
//           alt=""
//           aria-hidden="true"
//           loading="lazy"
//           className="absolute inset-0 -z-10 h-full w-full object-cover"
//           onError={() =>
//             setFailedImages((previous) => ({
//               ...previous,
//               [ad._id || activeIndex]: true,
//             }))
//           }
//         />
//       )}

//       <div className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-950/35 via-slate-950/15 to-transparent" />

//       <div
//         className={`relative z-10 flex w-full min-w-0 flex-col items-start justify-center text-white ${
//           isSidebar ? "p-4 sm:p-5" : "px-5 py-6 sm:px-8 sm:py-7 lg:px-10"
//         }`}
//       >
//         <span className="mb-2 inline-flex items-center rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-100 backdrop-blur-sm">
//           Sponsored
//         </span>

//         {ad.title && (
//           <h3
//             className={`max-w-2xl break-words font-bold leading-tight text-white drop-shadow-sm ${
//               isSidebar ? "text-base sm:text-lg" : "text-xl sm:text-2xl lg:text-3xl"
//             }`}
//           >
//             {ad.title}
//           </h3>
//         )}

//         {ad.postText && (
//           <p
//             className={`max-w-2xl whitespace-pre-wrap break-words font-semibold leading-6 text-white/95 drop-shadow-sm ${
//               ad.title ? "mt-2" : ""
//             } ${isSidebar ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}
//           >
//             {ad.postText}
//           </p>
//         )}

//         {ad.subPostText && (
//           <p
//             className={`mt-2 max-w-xl whitespace-pre-wrap break-words leading-5 text-white/85 ${
//               isSidebar ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
//             }`}
//           >
//             {ad.subPostText}
//           </p>
//         )}

//         {destination && (
//           <span
//             className={`mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-500 font-bold text-white shadow-lg transition duration-200 group-hover:bg-teal-400 ${
//               isSidebar ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-xs sm:text-sm"
//             }`}
//           >
//             Learn more <span aria-hidden="true">↗</span>
//           </span>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <section
//       className={`w-full min-w-0 ${isBanner ? "my-5" : "my-0"}`}
//       aria-label="Sponsored content"
//       data-ad-slot={slot}
//     >
//       <div className="w-full min-w-0 overflow-hidden rounded-xl">
//         {destination ? (
//           <a
//             key={`${ad._id || activeIndex}-link`}
//             href={destination}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//           >
//             {content}
//           </a>
//         ) : (
//           <article className="w-full overflow-hidden rounded-xl">{content}</article>
//         )}
//       </div>

//       {ads.length > 1 && (
//         <div
//           className="mt-2 flex items-center justify-center gap-2"
//           aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}
//         >
//           {ads.map((item, index) => (
//             <button
//               key={item._id || index}
//               type="button"
//               aria-label={`Show advertisement ${index + 1}`}
//               aria-current={index === activeIndex ? "true" : undefined}
//               onClick={() => setActiveIndex(index)}
//               className={`h-1.5 rounded-full transition-all ${
//                 index === activeIndex
//                   ? "w-6 bg-teal-600"
//                   : "w-1.5 bg-slate-300 hover:bg-slate-400"
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/axios";

const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/api\/?$/, "");

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") return "";
  if (/^(https?:\/\/|data:|blob:)/i.test(image)) return image;
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
};

export default function DashboardAdPlacement({
  location,
  layout = "stack",
  slot = "default",
  intervalMs = 2000,
}) {
  const [ads, setAds] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    if (!location) {
      setAds([]);
      setActiveIndex(0);
      return undefined;
    }

    let cancelled = false;

    const loadAds = async () => {
      try {
        const response = await API.get("/ads/placement", { params: { location } });
        if (cancelled) return;

        const results = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setAds(results);
        setActiveIndex(0);
        setFailedImages({});
      } catch (error) {
        console.error(
          `[Dashboard ads] Failed to load: ${location}`,
          error?.response?.data || error.message
        );
        if (!cancelled) {
          setAds([]);
          setActiveIndex(0);
        }
      }
    };

    loadAds();
    return () => {
      cancelled = true;
    };
  }, [location, slot]);

  useEffect(() => {
    if (ads.length < 2) return undefined;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % ads.length),
      Math.max(1000, intervalMs)
    );
    return () => window.clearInterval(timer);
  }, [ads.length, intervalMs]);

  if (!ads.length) return null;

  const ad = ads[activeIndex % ads.length];
  const imageUrl = getImageUrl(ad.image || ad.imageUrl || ad.bannerImage);
  const destination = (ad.linkUrl || ad.redirectUrl || ad.targetUrl || "").trim();
  const isBanner = layout === "banner";
  const isSidebar = layout === "sidebar";
  const imageKey = ad._id || activeIndex;
  const hasImage = Boolean(imageUrl && !failedImages[imageKey]);

  const heightClass = isBanner
    ? "min-h-[170px] sm:min-h-[200px] lg:min-h-[220px]"
    : isSidebar
      ? "min-h-[145px] sm:min-h-[160px]"
      : "min-h-[165px] sm:min-h-[185px]";

  const backgroundStyle = hasImage
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(2, 12, 30, 0.90) 0%, rgba(2, 12, 30, 0.68) 55%, rgba(2, 12, 30, 0.28) 100%), url("${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundImage: "linear-gradient(115deg, #07172e 0%, #075985 58%, #0f766e 100%)",
      };

  const content = (
    <div
      key={imageKey}
      style={backgroundStyle}
      className={`group relative isolate flex w-full min-w-0 items-center overflow-hidden rounded-xl ${heightClass} ${
        isBanner ? "shadow-md" : "shadow-sm transition-shadow duration-300 hover:shadow-lg"
      }`}
    >
      {hasImage && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          onError={() =>
            setFailedImages((previous) => ({ ...previous, [imageKey]: true }))
          }
        />
      )}

      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-950/25 via-slate-950/10 to-transparent" />

      <div
        className={`relative z-10 flex w-full min-w-0 flex-col items-start justify-center text-white ${
          isSidebar ? "p-3 sm:p-4" : "px-4 py-4 sm:px-6 sm:py-5 lg:px-8"
        }`}
      >
        <span className="mb-2 inline-flex max-w-full items-center rounded-full border border-white/25 bg-black/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-teal-100 backdrop-blur-sm">
          Sponsored
        </span>

        {ad.title && (
          <h3
            className={`w-full min-w-0 max-w-full break-words [overflow-wrap:anywhere] font-bold leading-snug text-white drop-shadow-sm ${
              isSidebar ? "text-sm sm:text-base" : "text-base sm:text-lg lg:text-xl"
            }`}
          >
            {ad.title}
          </h3>
        )}

        {ad.postText && (
          <p
            className={`mt-1 w-full min-w-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-medium leading-5 text-white/95 drop-shadow-sm ${
              isSidebar ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {ad.postText}
          </p>
        )}

        {ad.subPostText && (
          <p
            className={`mt-1 w-full min-w-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-4 text-white/85 ${
              isSidebar ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
            }`}
          >
            {ad.subPostText}
          </p>
        )}

        {destination && (
          <span
            className={`mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-teal-500 font-semibold text-white shadow-md transition duration-200 group-hover:bg-teal-400 ${
              isSidebar ? "px-3 py-1.5 text-[10px]" : "px-3.5 py-2 text-[11px] sm:text-xs"
            }`}
          >
            Learn more <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section
      className={`w-full min-w-0 ${isBanner ? "my-5" : "my-0"}`}
      aria-label="Sponsored content"
      data-ad-slot={slot}
    >
      <div className="w-full min-w-0 overflow-hidden rounded-xl">
        {destination ? (
          <a
            key={`${imageKey}-link`}
            href={destination}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full min-w-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            {content}
          </a>
        ) : (
          <article className="w-full min-w-0 overflow-hidden rounded-xl">{content}</article>
        )}
      </div>

      {ads.length > 1 && (
        <div
          className="mt-2 flex items-center justify-center gap-2"
          aria-label={`Advertisement ${activeIndex + 1} of ${ads.length}`}
        >
          {ads.map((item, index) => (
            <button
              key={item._id || index}
              type="button"
              aria-label={`Show advertisement ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-6 bg-teal-600"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
