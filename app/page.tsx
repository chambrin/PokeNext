import Pokemon from "@/app/components/home/Pokemon";
import Filter from "@/app/components/home/Filter";
import Information from "@/app/components/home/Information";
import '../styles/gobals.css';
export default function Home() {
  return (
      <>
          <div className="Home grid grid-cols-4">
              <div className="col-span-1">
                  <Filter />
              </div>
              <div className="col-span-2">
                  <Pokemon />
              </div>
              <div className="col-span-1">
                  <Information />
              </div>
          </div>
      </>
  )
}
