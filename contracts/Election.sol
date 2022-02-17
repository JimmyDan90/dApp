// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Electron {
  // 投票对象
  struct Candidate {
    uint8 id;
    string name;
    uint32 voteCount;
  }

  // 投票次数
  uint8 public candidatesCount;

  // 账户是否已投票
  mapping(address => bool) public voters;

  mapping(uint8 => Candidate) public candidates;

  // 投票事件
  event votedEvent(uint8 indexed _candidateId);

  constructor() {

  }

  function addCandidate(string memory _name) private {
    candidatesCount++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);  
  }

  function vote(uint8 _candidateId) public {
    // 已投票的不能再参与投票
    require(!voters[msg.sender]);
    // 检查投票是否在有效范围内
    require(_candidateId > 0 && _candidateId <= candidatesCount);
    // 标记投票后的账户
    voters[msg.sender] = true;
    // 更新投票次数
    candidates[_candidateId].voteCount++;
    // 记录投票事件
    emit votedEvent(_candidateId);
  }
}