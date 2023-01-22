import React, { useMemo, useState } from 'react'
import { useGetSalesQuery } from '../../state/api';
import { useTheme, Box } from "@mui/material";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from "@nivo/line";


const Daily = () => {
  
const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date("2022-01-01"));
  const [endDate, setEndDate] = useState(new Date("2022-01-10"));
  const { data } = useGetSalesQuery();

  const [formattedData] = useMemo(() => {
    if (!data){
        return [];
    }

    const { dailyData } = data;
    const totalSalesLine = {
        id: "totalSales",
        color: theme.palette.secondary.main,
        data: []
    };
    const totalUnitsLine = {
        id: "totalUnits",
        color: theme.palette.secondary[600],
        data: []
    };

    //This object has month, totalSales, and totalUnits
    Object.values(dailyData).forEach( ({ date, totalSales, totalUnits }) => {
        const dateFormatted = new Date(date);
        
        if (dateFormatted >= startDate && dateFormatted <= endDate){
            //Find the index of -, then add + 1 so that you will grab after the year
            const splitDate = date.substring(date.indexOf("-1") + 1);

            totalSalesLine.data = [
                ...totalSalesLine.data,
                //Daily will still show the month it belongs to.
                {x: splitDate, y: totalSales}
            ];
    
            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                {x: splitDate, y: totalUnits}
            ];
    
        }
    }

    );
    const formattedData = [totalSalesLine, totalUnitsLine];
    //The reason I pass an array of these 2 into an array is because we are showing 2 lines as opposed to before
    return [formattedData];
  }, [data, startDate, endDate])  //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box m = "1.5rem 2.5rem">
        <Header title = "DAILY SALES" subtitle = "Your day-to-day at your fingertips"/>
        <Box height = "75vh">
            {/* find out what "flex-end" does */}
            <Box display = "flex" justifyContent = "flex-end">
                <Box>
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                />
                </Box>
                <Box>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
                </Box>

            </Box>
            {data ? (
            <ResponsiveLine
                data={formattedData}
                theme={{
                axis: {
                    domain: {
                    line: {
                        stroke: theme.palette.secondary[200],
                    },
                    },
                    legend: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                    },
                    ticks: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                    },
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                    },
                },
                legends: {
                    text: {
                    fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                    color: theme.palette.primary.main,
                    },
                },
                }}
                colors={{ datum: "color" }}
                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "Month",
                legendOffset: 60,
                legendPosition: "middle",
                }}
                axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Total",
                legendOffset: -50,
                legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 50,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                    {
                        on: "hover",
                        style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                        },
                    },
                    ],
                },
                ]}
            />
        ) : (
          <>Loading...</>
        )}
            
        </Box>
    </Box>
  )
}

export default Daily;