import {Pet} from "../../model/Pet.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.tsx";
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
                fontFamily: "Roboto Flex",
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
                        fontFamily: "Roboto Flex",
                        fontSize: "15px",
                    },
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "Pet",
                colorByPoint: true,
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;

}

export default PieChart;