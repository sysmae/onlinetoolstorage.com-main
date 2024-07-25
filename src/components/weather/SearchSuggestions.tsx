import { LoadedCities } from '@/models/customTypes'

type Props = {
  cityOptions: LoadedCities[]
  onCityClickHandler: (value: string) => void
}

const SearchSuggestions = ({ cityOptions, onCityClickHandler }: Props) => {
  return (
    <div className="px-2 py-2 absolute w-full text-slate-300 bg-[#2e2968] shadow-md min-h-fit">
      <ul>
        {cityOptions.map((city, index) => {
          return (
            <li
              className="p-1 cursor-pointer  transition-all duration-300 hover:text-[#56aad8]"
              key={index}
              onClick={() =>
                onCityClickHandler(`${city.name}, ${city.country}`)
              }
            >{`${city.name}, ${city.country}`}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchSuggestions
