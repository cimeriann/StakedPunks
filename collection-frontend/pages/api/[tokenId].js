export default function handler(req, res) {
  // get the tokenId from the query params
  const tokenId = req.query.tokenId;
  // As all the images are uploaded on github, we can extract the images from github directly.
  const image_url =
    "https://github.com/Olaaa30/StakedPunks/tree/master/collection-frontend/public/stakedpunks/";

  // More info can be found here: https://docs.opensea.io/docs/metadata-standards
  res.status(200).json({
    name: "Staked Punk #" + tokenId,
    description: "Staked Punk is a collection of nfts with special utility",
    image: image_url + tokenId + ".svg",
  });
}
