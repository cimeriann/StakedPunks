import { Contract, ethers, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS } from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(falses);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState(false);
  const Web3ModalRef = useRef();

  /**
   * presaleMint: Mint an NFT during the presale
   */
  const presaleMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      const tx = await nftContract.presaleMint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Staked Punk!");
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * publicMint: Mint NFTs after presale
   */
  const publicMint = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      const tx = await nftContract.mint({
        value: ethers.utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Staked Punk!");
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * connectWallet: connects metamask wallet
   */
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * startPresale: starts presale for the collection
   */
  const startPresale = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      const tx = await nftContract.startPresale();
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkPresaleStarted: checks if presale has started
   */
  const checkPresaleStarted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (error) {
      console.error(err);
      return false;
    }
  };

  /**
   * checkPresaleEnded: checks if presale has ended
   */
  const checkPresaleEnded = async () => {
    try {
      const provider = getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _presaleEnded = await nftContract.presaleEnded();

      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  /**
   * getOwner: calls the contract to retrieve the owner
   */
  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);

      const _owner = await nftContract.owner();
      const signer = await getProviderOrSigner(true);
      const address = signer.getAddress();

      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * getProviderOrSigner: returns a Provider or signer object
   */
  const getProviderOrSigner = async () => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
  };
}
