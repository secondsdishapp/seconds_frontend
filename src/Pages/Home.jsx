import NearByOptions from "../Components/NearbyOptions/NearbyOptions";

export default function Home({count, menuToggle}) {
  return (
    <div>
   
      <NearByOptions count={count} menuToggle={menuToggle}/>
    </div>
  );
}
