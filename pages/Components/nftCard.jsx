import wrong from "next/image"

export const NFTCard=({nft})=>{
    return(
        <div className="w-1/4 flex flex-col ">
            <div className="rounded-md">
              <img style={{backgroundImage: "url(/loader1.gif)",backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'}} className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}  onError={(e)=>{e.target.onerror = null; e.target.src="/loader1.gif"}}/>             
            
                      </div>
           <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className=" ">
            <h2>{nft.title}</h2>
            <p>{nft.id.tokenId.substr(nft.id.tokenId.length-4)}</p>

          <div className="flex x-gap-2"> <p>{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
          <button onClick={() =>  navigator.clipboard.writeText(nft.contract.address)}><img style={{width:"50%"}} src="/copy.png"/></button></div> 
           </div>

           <div className="flex-grow mt-2">
            <p className="text-gray-600">{nft.description?.substr(0,150)}</p>
           </div>
           <div className="flex justify-center mb-1">
           <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>         
             </div>
        </div>
        </div>
    )
}