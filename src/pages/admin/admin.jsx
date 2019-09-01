import React, {Component} from "react";
import { Redirect } from "react-router-dom";

import memoryUntils from "../../Untils/memoryUntils";
export default class Admin extends Component{
  render(){
    const user = memoryUntils.user
    if(!user._id){
      return <Redirect to='/login'></Redirect>
    }
    return(
      <div>
        Hello {user.username}
      </div>
    )
  }
}
