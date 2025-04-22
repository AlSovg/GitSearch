import {SearchRep} from "@/components/custom/SearchRep";
import {RepList} from "@/components/custom/RepList";


export default function Home() {
  return (
    <div className="flex flex-col h-[50%] overflow-hidden p-5 w-full">
        <SearchRep/>
        <RepList/>
    </div>
  );
}
