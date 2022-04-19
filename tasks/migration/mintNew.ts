import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {parseEther} from "@ethersproject/units"
import { BigNumber } from 'ethers';
import { config as dotenvConfig } from 'dotenv';
import { formatBytes32String, parseBytes32String } from "@ethersproject/strings";
import { Bytes } from "@ethersproject/bytes";
import { getHolders } from "../../scripts/dev/getHolders";

task("mintNew", "mint tokens on new version")
    .setAction(async function (taskArgs, hre) {

        const network = hre.network.name;

        console.log(network);

        const ibAlluo = await hre.ethers.getContractAt("IbAlluoUSD", "address");
        let alluoLp = "0x29c66CF57a03d41Cfe6d9ecB6883aa0E2AbA21Ec"

        let holders: string[] = await getHolders(hre)

        const middleIndex = Math.ceil(holders.length / 2);

        const firstHalf = holders.splice(0, middleIndex);   
        const secondHalf = holders.splice(-middleIndex);

        await ibAlluo.migrateStep1(alluoLp, firstHalf)

        await ibAlluo.migrateStep1(alluoLp, secondHalf)

        console.log('mintNew task Done!');
    });
