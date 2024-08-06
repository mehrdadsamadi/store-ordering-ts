"use client"

import useCountDown from 'react-countdown-hook';
import ChooseRole from '@/components/client/login/ChooseRole'
import Loading from '@/components/Loading'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';
import { checkOtp, getOtp } from '@/actions/auth.actions';
import { ROLES } from '@/constants';
import { getCookie } from '@/actions/cookies.actions';

const LoginPage = () => {
  const { push } = useRouter()

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(2 * 60 * 1000, 1000)

  const [loading, setLoading] = useState(false)
  const [resendButton, setResendButton] = useState(false)
  const [steps, setSteps] = useState([
    {
      step: 1,
      description: "شماره همراه خود را وارد کنید",
      buttonText: "ثبت و ادامه"
    },
    {
      step: 2,
      description: "کد ارسال شده به شماره همراه خود را وارد کنید",
      buttonText: "ثبت و ادامه"
    },
    {
      step: 3,
      description: "عنوان شغلی خود را انتخاب کنید",
      buttonText: "ثبت و ادامه"
    },
  ])
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCookie("user")
        if(user) {
          push("/")
        }
      } catch (error) {
        console.log("failed to fetch user", error);
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (step === 2) {
      start(2 * 60 * 1000)
    }
  }, [step])

  useEffect(() => {
    if (timeLeft === 1000) {
      setResendButton(true)
    }
  }, [timeLeft])

  const handleGetOtp = async ({ resend = false }) => {
    setLoading(true)

    start(2 * 60 * 1000)
    setResendButton(false)

    await toast.promise(
      getOtp({ phone, resend }),
      {
        loading: 'در حال ارسال کد ...',
        success: ({ message }) => message!,
        error: ({ error }) => error!,
      }
    )
      .then(() => setStep(2))
      .finally(() => setLoading(false))
  }

  const handleCheckOtp = async () => {
    setLoading(true);

    await toast.promise(
      checkOtp({ phone, code }),
      {
        loading: 'در حال بررسی کد تایید',
        success: 'کد تایید با موفقیت بررسی شد',
        error: ({ error }) => error,
      }
    )
      .then((data) => {
        const { role } = data
        if (role && role !== ROLES.USER.name) {
          return push("/")
        }
        setStep(3)
      })
      .finally(() => setLoading(false))
  }

  return (
    <section>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-dark-400 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <Loading loading={loading} />
          <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>ورود / ثبت نام</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>{steps[step - 1]?.description}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-8">
              <div className="flex items-center justify-between mx-auto w-full max-w-xs">
                {
                  step === 1 && (
                    <Input
                      dir={phone ? "ltr" : "rtl"}
                      className='rounded-xl h-11 bg-dark-400'
                      type="text"
                      placeholder="شماره همراه"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  )
                }
                {
                  step === 2 && (
                    <div className='w-full'>
                      <InputOTP dir='ltr' maxLength={4} value={code} onChange={value => setCode(value)}>
                        <InputOTPGroup dir='ltr' className='shad-otp'>
                          <InputOTPSlot className='shad-otp-slot' index={0} />
                          <InputOTPSlot className='shad-otp-slot' index={1} />
                          <InputOTPSlot className='shad-otp-slot' index={2} />
                          <InputOTPSlot className='shad-otp-slot' index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )
                }
                {
                  step === 3 && (
                    <ChooseRole setLoading={setLoading} phone={phone} />
                  )
                }
              </div>

              {
                step !== 3 && (
                  <div className="flex flex-col space-y-5">
                    <div>
                      {
                        step === 1 && (
                          <Button className="w-full" disabled={phone.length !== 11} onClick={() => handleGetOtp({ resend: false })}>
                            {steps[step - 1]?.buttonText}
                          </Button>
                        )
                      }
                      {
                        step === 2 && (
                          <Button className="w-full" disabled={false} onClick={handleCheckOtp}>
                            {steps[step - 1]?.buttonText}
                          </Button>
                        )
                      }
                    </div>

                    {
                      step === 2 && (
                        <div className="flex flex-col gap-2 items-center justify-center text-center text-sm font-mediums text-gray-500">
                          {
                            resendButton ? (
                              <div className="flex gap-2">
                                <p>کد برای شما ارسال نشد؟</p>
                                <p className="flex flex-row items-center text-primary font-semibold cursor-pointer" onClick={() => handleGetOtp({ resend: true })}>ارسال دوباره</p>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <p>ارسال مجدد کد تا: </p>
                                <p className="flex flex-row items-center text-primary font-semibold cursor-pointer">{timeLeft / 1000} ثانیه دیگر</p>
                              </div>
                            )
                          }
                          <p className="font-semibold cursor-pointer" onClick={() => setStep(1)}>برای تغییر شماره همراه کلیک کنید</p>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage