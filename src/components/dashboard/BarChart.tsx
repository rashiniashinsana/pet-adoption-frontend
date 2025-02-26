import { Pet } from "../../model/Pet.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.tsx";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AdoptionRequest } from "../../model/AdoptionRequest.ts";

function BarChart() {
    const pets: Pet[] = useSelector((state: RootState) => state.pet);
    const adoptions: AdoptionRequest[] = useSelector((state: RootState) => state.request);

    // Aggregate pet count by breed
    const petCategoryData = pets.reduce<{ [key: string]: number }>((acc, pet) => {
        acc[pet.breed] = (acc[pet.breed] || 0) + 1;
        return acc;
    }, {});

    // Aggregate adoption request count by pet breed
    const adoptionRequestData = adoptions.reduce<{ [key: string]: number }>((acc, request) => {
        const pet = pets.find((p) => p.pet_id === request.pet_id); // Match request with pet
        if (pet) {
            acc[pet.breed] = (acc[pet.breed] || 0) + 1;
        }
        return acc;
    }, {});

    const breeds = Object.keys(petCategoryData);

    const options = {
        chart: {
            type: "column",
            style: { fontFamily: "Roboto Flex" },
        },
        title: {
            text: 'Pet Availability & Requests by Breed',
        },
        xAxis: {
            categories: breeds,
            title: { text: 'Breed' },
            labels: { style: { fontSize: '12px' } },
        },
        yAxis: {
            min: 0,
            title: { text: 'Count' },
            labels: { style: { fontSize: '12px' } },
        },
        tooltip: {
            shared: true,
            pointFormat: "<span style='color:{series.color}'>{series.name}</span>: <b>{point.y}</b><br/>",
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    style: { fontFamily: "Roboto Flex", fontSize: "12px" },
                },
            },
        },
        series: [
            {
                name: "Pet Count",
                data: breeds.map((breed) => petCategoryData[breed] || 0),
                color: "#7cb5ec",
            },
            {
                name: "Request Count",
                data: breeds.map((breed) => adoptionRequestData[breed] || 0),
                color: "#f45b5b",
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default BarChart;
