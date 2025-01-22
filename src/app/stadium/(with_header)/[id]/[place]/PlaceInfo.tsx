"use client";

import { useRecommededMenusData } from "@/app/hooks/useRecommendedMenusData";
import { useYapuPlaceDetailData } from "@/app/hooks/useYapuPlaceData";
import BackButton from "@/components/BackButton";
import KakaoMap from "@/components/KakaoMap";
import { usePlaceStore } from "@/stores/place-store";
import { useStadiumStore } from "@/stores/stadium-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useLikedPlaceController } from "@/app/hooks/useLikedPlaceController";

export default function PlaceInfo({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) {
  const [isClickedBack, setIsClickedBack] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const pathname = usePathname();
  const decodePath = decodeURI(pathname);

  const pathStadium = decodePath.split("/")[2];
  const pathPlace = decodePath.split("/")[3];

  const { selectedStadium } = useStadiumStore();
  const { selectedPlace, clearSelectedPlace } = usePlaceStore();
  const { loading, likedPlace, onAddPlace, onRemovePlace } =
    useLikedPlaceController(userId);
  const hasHydrated = usePlaceStore.persist.hasHydrated();

  const router = useRouter();
  const { isPlaceLoading, yapuPlaceDetailData } = useYapuPlaceDetailData(
    (selectedStadium?.id as string) || pathStadium,
    selectedPlace! || pathPlace
  );

  const { isMenuLoading, recommendedMenusData } = useRecommededMenusData(
    selectedPlace! || pathPlace
  );

  const handleBackButton = () => {
    clearSelectedPlace();
    // router.replace(`/stadium/${selectedStadium?.id}`);
    router.back();
  };

  const onClickAddLike = () => {
    if (!userEmail) {
      alert("로그인 후 이용해주세요");
      return;
    }
    onAddPlace({
      id: userId,
      place_name: selectedPlace!,
      stadium_id: selectedStadium?.id as string,
    });
    setIsLiked(!isLiked);
  };

  const onClickRemoveLike = () => {
    if (!userEmail) {
      alert("로그인 후 이용해주세요");
      return;
    }
    onRemovePlace({
      id: userId,
      place_name: selectedPlace!,
    });
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (likedPlace?.find((i) => i.place_name === selectedPlace)) {
      setIsLiked(true);
    }
  }, [likedPlace, selectedPlace]);

  // 브라우저 뒤로가기 제어
  useEffect(() => {
    const handlePopState = () => {
      setIsClickedBack(true);
      clearSelectedPlace();
    };
    window.addEventListener("popstate", handlePopState);
    setIsClickedBack(false);
  }, [isClickedBack, clearSelectedPlace]);

  if (isPlaceLoading || isMenuLoading || loading) {
    return (
      <div className="flex justify-center mt-[20px] mb-[30px] ">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hasHydrated) return;

  return (
    <div>
      <BackButton fn={handleBackButton} />
      <div>
        {yapuPlaceDetailData[0] && (
          <div className="flex flex-col ">
            <section className="mb-[20px]">
              <div className="flex flex-row justify-center items-center">
                <h1 className="flex flex-row justify-center lg:items-center font-paper_logy lg:text-[32px] text-[24px] text-center">
                  <span className="mr-[5px]">
                    {yapuPlaceDetailData[0]?.food_type}
                  </span>
                  <span>{yapuPlaceDetailData[0]?.name}</span>
                </h1>
                <div>
                  {isLiked ? (
                    <FaHeart
                      onClick={onClickRemoveLike}
                      color="pink"
                      className="ml-[10px] cursor-pointer lg:text-[26px] text-[20px]"
                    />
                  ) : (
                    <FaRegHeart
                      onClick={onClickAddLike}
                      className="ml-[10px] cursor-pointer lg:text-[26px] text-[20px]"
                    />
                  )}
                </div>
              </div>
              <p className="font-s_core font-bold lg:text-[18px] text-[14px] lg:mt-[30px] mt-[10px] mb-[10px] lg:ml-[30px] ml-[20px]">
                위치 : {yapuPlaceDetailData[0]?.location}
              </p>
              <p className="font-s_core flex lg:text-[18px] text-[14px] flex-row items-center mb-[10px] lg:ml-[30px] ml-[20px]">
                <span className="mr-[20px]">
                  {yapuPlaceDetailData[0]?.is_delivery_or_takeout_available}
                </span>
                <span>{yapuPlaceDetailData[0]?.info}</span>
              </p>
              {!yapuPlaceDetailData[0]?.inside_stadium &&
                selectedStadium &&
                yapuPlaceDetailData[0] && (
                  <KakaoMap
                    place={yapuPlaceDetailData[0]!}
                    stadium={selectedStadium!}
                  />
                )}
            </section>
            <hr className="w-[100%] border-b-1 border-dashed border-gray-400 " />
            <section className="lg:mt-[40px] mt-[20px]">
              {!isMenuLoading && (
                <div className="flex flex-col items-center ">
                  <p className="text-center font-paper_logy lg:text-[26px] text-[22px] tracking-widest mb-[20px]">
                    📋추천 메뉴
                  </p>
                  <ul className="lg:w-[80%] w-[90%] border-b-2  pt-[40px] px-[20px] pb-[20px] mb-[20px] rounded-lg text-[#3d211a] bg-[#fff2d2]">
                    {recommendedMenusData.map((i) => (
                      <li
                        key={i.menu_name}
                        className="border-b-[1px] border-dashed border-[#3d211a] flex flex-col mb-[20px] pb-[5px] lg:text-[18px] text-[12px] "
                      >
                        <span className="font-s_core">{i.menu_name}</span>
                        <span className="ml-auto mt-[10px] font-s_core">
                          {i.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
