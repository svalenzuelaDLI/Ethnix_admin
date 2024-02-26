'use client';

import WidgetCard from '@/components/cards/widget-card';
import TrendingUpIcon from '@/components/icons/trending-up';
import { DatePicker } from '@/components/ui/datepicker';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import { useCallback, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
// TYPES
import { IModel_NewCustomers, IModel_Errorgateway } from "@/types";
import {
  statusCustomer
} from '@/app/shared/newcustomers/select-options';

const datax = [
  { name: 'Total used storage', value: 70 },
  { name: 'Available storage', value: 5 },
  { name: 'Total used storage', value: 15 },
  { name: 'Total used storage', value: 10 },
];
const COLORS = ['#ffcc00', '#ff3300', '#3399ff', '#66ccff', '#ccccff','#009933','#009933','#009933'];

function calculatePercentage(total: number, value: number) {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, midAngle } =
    props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 100) * cos;
  const sy = cy + (outerRadius - 100) * sin;
  return (
    <Sector
      cx={sx}
      cy={sy}
      cornerRadius={5}
      innerRadius={50}
      outerRadius={120}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={props.fill}
    />
  );
};

export default function Spending({ className, newcustomers }: { newcustomers: IModel_NewCustomers.INewCustomer[],className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
 // const [chartData] = useState(data);

  const onMouseOver = useCallback((_: any, index: number) => {
    setActiveIndex(0);
  }, []);
  const onMouseLeave = useCallback(() => {
    setActiveIndex(0);
  }, []);

  const data = statusCustomer
  .map(customerStat => ({
    name: customerStat.label,
    value: newcustomers.filter(item => item.status === customerStat.value).length
  }));


  return (
    <WidgetCard
      title="Customer Status by Department"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('@container', className)}
      action={null
      }
    >
      <div className="mb-8 mt-1 flex items-center gap-2">
        {/* <Title as="h2" className="font-semibold">
          $750.45k
        </Title> 
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-medium leading-none"> +32.40%</span>
        </span>*/}
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative h-[300px] w-full after:absolute after:inset-1/2 after:h-24 after:w-24 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300 @sm:py-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
              <Pie
                activeIndex={activeIndex}
                data={data}
                cornerRadius={5}
                innerRadius={70}
                outerRadius={120}
                paddingAngle={6}
                stroke="rgba(0,0,0,0)"
                dataKey="value"
                activeShape={renderActiveShape}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 gap-4 gap-x-6 @[24rem]:grid-cols-2 @[28rem]:mx-auto">
          {data.map((item, index) =>         
          <Detail color={COLORS[index]} value={parseFloat(calculatePercentage(newcustomers.length,item.value))} text={item.name} />    
          )}
          {/* <Detail color={COLORS[1]} value={8} text="Office Expense" />
          <Detail color={COLORS[2]} value={32} text="Investment" />
          <Detail color={COLORS[3]} value={96} text="Stock Market" /> */}
        </div>
      </div>
    </WidgetCard>
  );
}

function Detail({
  color,
  value,
  text,
}: {
  color: string;
  value: number;
  text: string;
}) {
  return (
    <div className="flex justify-between gap-2">
      <div className=" col-span-3 flex items-center justify-start gap-1.5">
        <span
          style={{ background: color }}
          className="block h-2.5 w-2.5 rounded"
        />
        <p className="text-gray-500">{text}</p>
      </div>
      <span
        style={{ borderColor: color }}
        className="rounded-full border-2 px-2 py-0.5 font-bold text-gray-700"
      >
        {value}%
      </span>
    </div>
  );
}
