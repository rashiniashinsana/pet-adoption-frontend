import {Pet} from "../model/Pet.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PieChart() {
    const pets: Pet[] = useSelector((state: RootState) => state.pet);

    const petCategoryData = pets.reduce<{ [key: string]: number }>((acc, pet) => {
        acc[pet.breed] = (acc[pet.breed] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(petCategoryData).map(([category, count]) => ({
        name: category,
        y: count,
    }));

    const options = {
        chart: {
            type: "pie",
            style: {
                fontFamily: "Poppins",
            },
        },
        title: {
            text: 'Pet Availability',
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily: "Poppins", // Set font for data labels
                        fontSize: "10px",
                    },
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "Crops",
                colorByPoint: true,
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;

}

export default PieChart;