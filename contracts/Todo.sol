//SPDX-License-Identifier: UNLICENSED
pragma experimental ABIEncoderV2;
pragma solidity 0.5.16;

contract Todo{

  struct Task{
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint public lastTaskId;
  uint[] taskIds;
  mapping(uint=>Task) public  tasks;
  event TaskCreated(uint,uint,string,string);

  constructor() public{
    lastTaskId=0;
  }

  function createTask(string memory _content,string memory _author) public {
    tasks[lastTaskId]=Task(lastTaskId,block.timestamp,_content,_author,false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId,block.timestamp,_content,_author);
    lastTaskId++;
  }

  function getTask(uint _id) public view returns(Task memory){
    if(_id > lastTaskId - 1  || _id < 0){
      revert();
    }
    return tasks[_id];
  }

  function getTaskIds() public view returns(uint[] memory){
    return taskIds;
  }
}
