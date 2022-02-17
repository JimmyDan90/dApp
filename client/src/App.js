import React, { useState, useEffect, useContext } from "react";
import {Row, Col} from 'antd'
import Election from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import { GlobalContext } from "./contexts/GlobalState";

import Votes from "./containers/Votes";

import "./App.css";

const App = () => {
  const { contract, setContract, account, setAccount, isVoted, setVoted } =
    useContext(GlobalContext);
  const [loadingContent, setLoadingContent] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [web3, setWeb3] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          Election.abi,
          deployedNetwork && deployedNetwork.address
        );
        setWeb3(web3);
        setAccount(accounts[0]);
        setContract(contractInstance);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      // 请求合约数据
      let candidatesCount = await contract.methods.candidatesCount().call();

      const candidates = [];

      // 加载投票数据
      for (let i = 1; i <= candidatesCount; i++) {
        let candidate = await contract.methods.candidates(i).call();
        let id = candidate[0];
        let name = candidate[1];
        let voteCount = candidate[2];

        candidates.push({
          id,
          name,
          voteCount,
        });
      }

      const isVoted = await contract.methods.voters(account).call();
      if (isVoted) setVoted(true);

      setCandidates(candidates);
      setLoadingContent(false);
    };

    if (
      typeof web3 !== "undefined" &&
      typeof account !== "undefined" &&
      typeof contract.methods !== "undefined"
    ) {
      load();
    }
  }, [web3, account, contract, isVoted]);

  if (web3 === "undefined") {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <Row>
        <Row>
          <Col span={24}>
            <div>
              {loadingContent ? (
                <div id="loader">
                  <p className="text-center">Loading...</p>
                  <div>
                    <RenderedList numbers={numbers} />
                  </div>
                </div>
              ) : (
                <Votes candidates={candidates} />
              )}
            </div>
            <div style={{marginTop: 10}}>
              <p id="accountAddress" className="text-center">
                <b>当前账户地址: </b>
                {account}
              </p>
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

const numbers = [1, 2, 3];

const RenderedList = (props) => {
  const numbers = props.numbers;
  const items = numbers.map((number) => (
    <li key={number.toString()} value={number} />
  ));
  return <ul>{items}</ul>;
};

// const Item = (props) => <ListItem>{props.value}</ListItem>;

export default App;
