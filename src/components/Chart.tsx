import React from 'react';
import { Brewery } from '../types/Brewery';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

interface ChartProps {
  data?: Brewery[];
}

export default function Chart(props: ChartProps) {
  const { data } = props;

  // Group the breweries by type
  const typeCounts = data?.reduce((counts, brewery) => {
    const type = brewery.brewery_type || 'Unknown';
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Convert the typeCounts object into an array of {id, value} objects
  const typeData = Object.entries(typeCounts || {}).map(([type, count]) => ({
    id: type,
    value: count,
  }));

  // Group the breweries by state
  const stateCounts = data?.reduce((counts, brewery) => {
    const state = brewery.state || 'Unknown';
    counts[state] = (counts[state] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Convert the stateCounts object into an array of {state, count} objects
  const stateData = Object.entries(stateCounts || {}).map(([state, count]) => ({
    state,
    count,
  }));

  return (
    <div className="text-white text-center">
      <h1 className="text-xl">States with most beer</h1>
      <div style={{ height: '800px' }}>
        <ResponsiveBar
          data={stateData}
          keys={['count']}
          indexBy="state"
          margin={{ top: 50, right: 130, bottom: 50, left: 260 }}
          padding={0.3}
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          theme={{
            textColor: 'white',
            tooltip: {
              container: {
                background: '#333',
                color: 'white',
              },
            },
          }}
          enableGridX={true}
          enableGridY={false}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Beer Amount',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'State',
            legendPosition: 'middle',
            legendOffset: -140,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
        />
      </div>
      <div style={{ height: '400px' }}>
        <ResponsivePie
          data={typeData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          sortByValue={true}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'nivo' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
          theme={{
            textColor: 'white',
            tooltip: {
              container: {
                background: '#fff',
                color: 'black',
              },
            },
            labels: {
              text: {
                fill: 'white',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
