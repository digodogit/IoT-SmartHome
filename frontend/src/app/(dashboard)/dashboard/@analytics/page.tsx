import { AnalyticCard } from "@/components/organisms/AnalyticCard";
import { Graphics } from "@/components/organisms/Graphics";

export default function analyticsPage() {
  return (
    <div className="row-span-auto col-span-1 col-start-2 row-start-2">
      <div className="flex flex-col gap-5 p-3">
        <h1>graficos</h1>
        <div className=" bg-white border-2 rounded-lg border-slate-300">
          <div className="flex flex-row flex-wrap justify-around gap-5 w-auto bg-green-100">
            <Graphics imgType="img2" />
            <Graphics imgType="img2" />
          </div>
          <div>
            <div className="flex flex-row flex-wrap content-around justify-center gap-10 w-auto">
              <AnalyticCard textHeader="uma imagem" imgType="img4" />
              <AnalyticCard textHeader="uma imagem" imgType="img4" />
              <AnalyticCard textHeader="uma imagem" imgType="img4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
