import React, {Component} from "react";
import { Image, View} from "@tarojs/components";
import {AtInput, AtButton, AtCheckbox, AtSteps} from 'taro-ui'
import Taro from "@tarojs/taro";
import './Intelligent_guidance_step2.less'
import {connect} from "react-redux";
import {storeInteTreatStep2} from "../../actions/inte-treat";
import {APIBASEURL} from "../../constants/global";
import {BASEURL} from "../../constants/global";
import moment from "moment";

@connect(({inteTreatInfo}) => ({
  inteTreatInfo
}), (dispatch) => ({
  storeInteTreatStep2(symptom) {
    dispatch(storeInteTreatStep2(symptom))
  }
}))

class Intelligent_guidance_step2 extends Component{
  constructor () {
    super(...arguments)
    this.state = {
      checkedList: [],//不适症状
      current: 0,
      itemcode:''
    }
    this.checkboxOption = [{
      value: '鼻塞',
      label: '鼻塞',
    },{
      value: '头疼',
      label: '头疼'
    },{
      value: '痰黄',
      label: '痰黄',
    }, {
      value: '气短',
      label: '气短',
    },{
      value: '咳嗽',
      label: '咳嗽',
    }]
  }
 componentDidMount() {
   Taro.getStorage({
     key: '__itemcode__',
     success:(res)=> {
       this.setState({
         itemcode: res.data
       })
     }
   })
 }

  onChange (current) {
    this.setState({
      current
    })
  }

  handleChange (value) {
    this.setState({
      checkedList: value,
      value
    })
    return value
  }

  /*点击下一步*/
  toIntelligent_guidance_step3(){
    new Promise((resolve,reject) => {
     this.props.storeInteTreatStep2(this.state.checkedList.toString())
        resolve()
    }).then(()=>{
        Taro.navigateTo({url:'/pages/Intelligent_guidance/Intelligent_guidance_step3'});
    })
  }

  render(){
    const items = [
      {
        title: '已完成',
        status: 'success'
      },
      {
        title: '进行中',
        status: 'success'
      },
      {
        title: '待进行',
      }
    ]
    return(
      <View>
        <view className='header'>
          <view className='header-text'>智能导诊</view>
        </view>
        <View className='mar-step'>
          <AtSteps
            items={items}
            current={this.state.current}
            onChange={this.onChange.bind(this)}
          />
        </View>
        <View className='at-row row-border'>
          <Image className='at-col at-col-1 info-circle' src={BASEURL +'info-circle.svg'}/>
          <View className='at-col at-col-11'>
            <AtInput
              disabled
              name='value'
              type='text'
              placeholder='请选择不适症状'
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        </View>
        <View>
          <AtCheckbox
            options={this.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        <View><AtButton type='primary' className='dia-btn' onClick={this.toIntelligent_guidance_step3.bind(this)}>下一步</AtButton></View>
      </View>
    )
  }
}
export default Intelligent_guidance_step2
