import joi from 'joi'

export const signup = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName:joi.string().min(3).max(10).required(),
    userName:joi.string().alphanum().min(4).max(20).required(),
    email:joi.string().email(
        {minDomainSegments: 2 , maxDomainSegments: 4 , tlds:{allow :['com' , 'net' ,'edu' ,'eg']} }
    ).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    cPassword:joi.string().valid(joi.ref("password")).required(),
}).required()



export const login=joi.object({
    email:joi.string().email({minDomainSegments: 2 , maxDomainSegments: 4 , tlds:{allow:['com' , 'net' , 'edu' ,'eg']}}).required(),
    password:joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
}).required()