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
    bool updated;
  }

  uint public lastTaskId;
  uint[] taskIds;
  mapping(uint=>Task) public  tasks;
  event TaskCreated(uint,uint,string,string);

  constructor() public{
    lastTaskId=0;
  }

  function createTask(string memory _content,string memory _author) public {
    tasks[lastTaskId]=Task(lastTaskId,block.timestamp,_content,_author,false,false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId,block.timestamp,_content,_author);
    lastTaskId++;
  }

  function getTask(uint _id) public view returns(
    uint,
    uint,
    string memory,
    string memory,
    bool,
    bool
  ){
    return (
      _id,
      tasks[_id].date,
      tasks[_id].content,
      tasks[_id].author,
      tasks[_id].done,
      tasks[_id].updated
    );
  }

  function getTaskIds() public view returns(uint[] memory){
    return taskIds;
  }
  
  function done(uint _id) public {
    tasks[_id].done=true;
  }
  function update(uint _id,string memory _content) public{
    tasks[_id].content=_content;
    tasks[_id].date=block.timestamp;
    tasks[_id].updated=true;
  }
}
