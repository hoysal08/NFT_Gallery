import { useState } from "react"
import {NFTCard} from "./Components/nftCard.jsx"


const Home = () => {
  const [wallet,setwalletaddress]=useState("");
  const[CollectionAddres,setcollectionaddress]=useState("");
  const[NFTS,setNFTS]=useState([])
  const[fetchForCollectionn,setFetchForCollection]=useState(false)

 const  fetchNft=async()=>{
      let nfts;
      console.log("Fetching nft...");
        const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;
      if(!CollectionAddres.length){

        var requestOptions = {
          method: 'GET'
        };



        const fetchURL = `${baseURL}?owner=${wallet}`;
        console.log("here")

        nfts = await fetch(fetchURL, requestOptions).then(data=>data.json())
      }
      else
      {
        
        console.log("Fetching nfts for collection owned by address")
        
        const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${CollectionAddres}`;

        nfts = await fetch(fetchURL, requestOptions).then(data=>data.json())

        
      }
      if(nfts){
       console.log(nfts)
        setNFTS(nfts.ownedNfts)

      }
 }

 const fetchNFTForCltn = async()=>{
   
  console.log("called")

  if (CollectionAddres.length) {

    var requestOptions = {
      method: 'GET'
    };


  
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`;
  const fetchURL = `${baseURL}?contractAddress=${CollectionAddres}&withMetadata=${"true"}`;
  const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())

      if (nfts) {
        console.log("NFTs in collection:", nfts)
 
        setNFTS(nfts.nfts)
        console.log(NFTS.length)
        }
            }
     }
console.log(process.env.NEXT_PUBLIC_API_KEY)
return (
    
    <div className="flex  flex-col items-center justify-center py-2 gap-y-3">
    <div className="flex flex-col w-full justify-center items-center gap-y-2">
      <input disabled={fetchForCollectionn}  className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" placeholder="Add your wallet address" type="text" value={wallet} onChange={(e)=>{setwalletaddress(e.target.value)}}></input>
      <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" placeholder='Add the collection address' type="text"  value={CollectionAddres} onChange={(e)=>{setcollectionaddress(e.target.value)}}></input>
      <label className="text-gray-600"><input className="mr-2" type="checkbox"  onChange={(e)=>{setFetchForCollection(e.target.checked)}}></input>Fetch for  Collection</label>
       <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={(e)=>{
        e.preventDefault();
        setNFTS([])
        if(fetchForCollectionn){
          fetchNFTForCltn()
        }
        else{
          fetchNft();
        }
       }}>Let's Go</button> 

    </div>
    <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
      {
       NFTS.length && NFTS.map(nft=> <NFTCard nft={nft} />)
      }
    </div>
    </div>
  )
}

export default Home

//add copy icon to contract address;
//startToken using doc, add pagination
