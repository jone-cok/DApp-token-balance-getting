import React, { FC } from 'react'
import './Layout.scss';
import maclogo from '@/assets/images/Shopo..png';
import { Link } from 'react-router-dom';
// let links: string[][] = [["Sports", "Home", "Live", "Sports Rules"],
// ["Casino", "Games", "VIP Clubs", "Promotion"], ["Support", "Fairness", "Affiliate", "Responsible Gambling", "Gamble Aware", "Live Support", "Help Center"],
// ["Community", "Blogs", "Forum", "Facebook", "Twitter", "Instagram", "Youtube", "Shop"], ["About Us", "Rrivacy Policy", "Licenses", "AML Policy", "Term of Service", "Self Exclusion", "Primedice"]];

interface IFooterString {
  title: string
  subtitle: IFooterStringLink[]
}
interface IFooterStringLink {
  name: string
  nameLink: string
}

const linksSport: IFooterString[] = [{ title: "Sports", subtitle: [{ name: "Home", nameLink: "#" }, { name: "Live", nameLink: "#" }, { name: "Sports Rules", nameLink: "#" }] }];
const LinksCasino: IFooterString[] = [{ title: "Casino", subtitle: [{ name: "Games", nameLink: "#" }, { name: "VIP Clubs", nameLink: "#" }, { name: "Promotion", nameLink: "#" }] }];
const LinksSupport: IFooterString[] = [{ title: "Support", subtitle: [{ name: "Fairness", nameLink: "#" }, { name: "Affiliate", nameLink: "#" }, { name: "Responsible Gambling", nameLink: "#" }, { name: "Gamble Aware", nameLink: "#" }, { name: "Live Support", nameLink: "#" }, { name: "Help Center", nameLink: "#" }] }];
const LinksCommunity: IFooterString[] = [{ title: "Community", subtitle: [{ name: "Blogs", nameLink: "#" }, { name: "Forum", nameLink: "#" }, { name: "Facebook", nameLink: "#" }, { name: "Twitter", nameLink: "#" }, { name: "Instagram", nameLink: "#" }, { name: "Youtube", nameLink: "#" }, { name: "Shop", nameLink: "#" }] }];
const LinksAboutUs: IFooterString[] = [{ title: "About Us", subtitle: [{ name: "Rrivacy Policy", nameLink: "#" }, { name: "Licenses", nameLink: "#" }, { name: "AML Policy", nameLink: "#" }, { name: "Term of Service", nameLink: "#" }, { name: "Self Exclusion", nameLink: "#" }, { name: "Primedice", nameLink: "#" }] }];

const Footer = () => {

  return (
    <div className="footer flex flex-col md:flex-row box-border m-auto mb-0">
      <div className='maclogo flex flex-col items-center  mt-[50px] mr-[5vw] md:items-end'>
        <img src={maclogo} alt="logo" style={{ width: "244px", height: "60px" }} />
        < div className="text-[16px] mt-[20px] font-serif font-[400] leading-[19.2px] opacity-50">
          mascot.com | All Right Reserved.
        </div>
        <div className="text-[16px]  font-mono font-[600] leading-[19.2px]">
          1BTC = $37,735.85
        </div>
      </div>
      <div className=" md:invisible mt-[30px] h-0 w-[378px[] object-center border-[1px] border-solid border-white" />
      <div className="flex flex-col md:flex-row">

        <div className="row flex flex-row md:flex-col">

          <div className="w-[50vw] mt-[50px] ml-[40px] md:w-[12vw]">
            {linksSport.map((link, index) => {
              return (<div key={index}>
                <h4 className='text-[16px]  font-mono font-[600] leading-[19.2px] mb-[12.5px]'>{link.title}</h4>
                {
                  link.subtitle.map((sublink, key) => {
                    return (
                      <div key={key}>
                        < Link to={sublink.nameLink} >
                          <p className='text-[16px] my-[5px] font-mono font-[400] leading-[19.2px] opacity-50'>{sublink.name}</p>
                        </Link>
                      </div>
                    )
                  })}
              </div>
              )
            })}

          </div>
          <div className="w-[50vw] mt-[50px] ml-[40px] md:w-[12vw] md:mt-[20px]">
            {LinksCasino.map((link, index) => {
              return (<div key={index}>
                <h4 className='text-[16px]  font-mono font-[600] leading-[19.2px] mb-[12.5px]'>{link.title}</h4>
                {
                  link.subtitle.map((sublink, key) => {
                    return (
                      <div key={key}>
                        < Link to={sublink.nameLink} >
                          <p className='text-[16px] my-[5px] font-mono font-[400] leading-[19.2px] opacity-50'>{sublink.name}</p>
                        </Link>
                      </div>
                    )
                  })}
              </div>
              )
            })}

          </div>
        </div>
        <div className="row flex flex-row ">
          <div className="w-[50vw] mt-[50px] ml-[40px] md:w-[12vw]">
            {LinksSupport.map((link, index) => {
              return (<div key={index}>
                <h4 className='text-[16px]  font-mono font-[600] leading-[19.2px] mb-[12.5px]'>{link.title}</h4>
                {
                  link.subtitle.map((sublink, key) => {
                    return (
                      <div key={key}>
                        < Link to={sublink.nameLink} >
                          <p className='text-[16px] my-[5px] font-mono font-[400] leading-[19.2px] opacity-50'>{sublink.name}</p>
                        </Link>
                      </div>
                    )
                  })}
              </div>
              )
            })}

          </div>
          <div className="w-[50vw] mt-[50px] ml-[40px] md:w-[12vw]">
            {LinksCommunity.map((link, index) => {
              return (<div key={index}>
                <h4 className='text-[16px]  font-mono font-[600] leading-[19.2px] mb-[12.5px]'>{link.title}</h4>
                {
                  link.subtitle.map((sublink, key) => {
                    return (
                      <div key={key}>
                        < Link to={sublink.nameLink} >
                          <p className='text-[16px] my-[5px] font-mono font-[400] leading-[19.2px] opacity-50'>{sublink.name}</p>
                        </Link>
                      </div>
                    )
                  })}
              </div>
              )
            })}

          </div>
        </div>
        <div className="row flex flex-row ">
          <div className="w-[50vw] mt-[50px] ml-[40px] md:w-[12vw]">

            {LinksAboutUs.map((link, index) => {
              return (<div key={index}>
                <h4 className='text-[16px]  font-mono font-[600] leading-[19.2px] mb-[12.5px]'>{link.title}</h4>
                {
                  link.subtitle.map((sublink, key) => {
                    return (
                      <div key={key}>
                        < Link to={sublink.nameLink} >
                          <p className='text-[16px] my-[5px] font-mono font-[400] leading-[19.2px] opacity-50'>{sublink.name}</p>
                        </Link>
                      </div>
                    )
                  })}
              </div>
              )
            })}
          </div>
        </div>
      </div>

    </div >
  )
}

export default Footer
