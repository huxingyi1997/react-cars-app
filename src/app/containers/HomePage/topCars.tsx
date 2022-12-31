import { useEffect, useState, type FC } from "react";
import { Dispatch } from "redux";
import styled from "styled-components";
import tw from "twin.macro";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useMediaQuery } from "react-responsive";
import { MoonLoader } from "react-spinners";
import { GetCars_cars } from "../../services/carService/__generated__/GetCars";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { SCREENS } from "../../components/responsive";
import carService from "../../services/carService";
import { setTopCars } from "./slice";
import { makeSelectTopCars } from "./selector";
import Car from "../../components/car";

const TopCarsContainer = styled.div`
  min-height: 400px;
  margin-top: 6em;
  ${tw`
    max-w-screen-lg
    w-full
    flex
    flex-col
    items-center
    justify-center
    pl-4
    pr-4
    md:pl-0
    md:pr-0
    mb-10
  `};
`;

const Title = styled.h2`
  ${tw`
    text-3xl
    lg:text-5xl
    text-black
    font-extrabold
  `};
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
  `}
`;

const EmptyCars = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
    text-sm
    text-gray-500
  `};
`;

const LoadingContainer = styled.div`
  ${tw`
    w-full
    mt-9
    flex
    justify-center
    items-center
    text-base
    text-black
  `};
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars)),
})

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
  topCars,
}));

// const wait= (timeout: number) => new Promise((rs) => setTimeout(rs, timeout));

const TopCars: FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const { topCars } = useSelector(stateSelector)
  const { setTopCars } = actionDispatch(useDispatch())

  console.log("topCars", topCars);

  const fetchTopCars = async () => {
    setLoading(true);
    const cars = await carService.getCars().catch((err) => {
      console.log("Error: ", err);
    })

    console.log("Cars: ", cars);
    if (cars) setTopCars(cars);
    setLoading(false);
  }

  const isEmptyTopCars = !topCars || topCars.length === 0;

  const cars =
    (!isEmptyTopCars &&
      topCars.map((car) => <Car {...car} thumbnailSrc={car.thumbnailUrl} />)) ||
    [];

  useEffect(() => {
    fetchTopCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

  return (
    <TopCarsContainer>
      <Title>Explore Our Top Deals</Title>
      {isLoading && (
        <LoadingContainer>
          <MoonLoader loading size={20} />
        </LoadingContainer>
      )}
      {isEmptyTopCars && !isLoading && <EmptyCars>No Cars To Show!</EmptyCars>}
      {!isEmptyTopCars && !isLoading && <CarsContainer>
        <Carousel
          value={current}
          onChange={setCurrent}
          slides={cars}
          plugins={[
            "clickToChange",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 3,
              },
            },
          ]}
          breakpoints={{
            640: {
              plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 1,
                  },
                },
              ],
            },
            900: {
              plugins: [
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 2,
                  },
                },
              ],
            },
          }}
        />
        <Dots value={current} onChange={setCurrent} number={numberOfDots} />
      </CarsContainer>}
    </TopCarsContainer>
  );
};

export default TopCars;
