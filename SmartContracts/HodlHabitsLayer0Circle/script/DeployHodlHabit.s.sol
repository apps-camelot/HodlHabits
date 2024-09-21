// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../contracts/MyOApp.sol";

contract DeployHodlHabit is Script {
    function run() external {
        vm.startBroadcast();

        MyOApp myOApp = new MyOApp(0x1a44076050125825900e736c501f859c50fE728c,0x75d183d150286DB34228faCb0402748627155E3C);

        console.log("HodlHabit deployed to:", address(myOApp));

        vm.stopBroadcast();
    }
}
