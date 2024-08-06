import React, { useEffect, useState } from 'react'
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogHeader, DialogFooter } from './ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from './ui/form'

const maxBioSize = 400

const formSchema = z.object({
  bio: z.string()
    .min(1, {message: "Bio is required."})
    .max(maxBioSize, {message: `Bio must not be longer than ${maxBioSize} characters.`})
})

export function DialogComponent() {
  const [image, setImage] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bioLen, setBioLen] = useState(0)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleBioLen = (e: string) => setBioLen(e.length)

  async function getProfilePic() {
    try {
      const response = await fetch("https://api.github.com/users/YUT4R0");
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      const profilePic = data.avatar_url;
      setImage(profilePic)
      openModal()
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger asChild>
        <Button
          type='submit'
          variant={'outline'}
          size={'lg'}
          className='text-xl hover:invert hover:border-black hover:border-2 transition-all'
          onClick={() => getProfilePic()}
        >
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(() => alert('penis'))}
          className="absolute w-1/3 h-3/4 bg-zinc-200 px-8 py-4 rounded-md flex flex-col gap-5"
        >
        <DialogHeader>
          <DialogTitle className='opacity-30 text-sm border-b-2 border-dashed border-zinc-500'>Creating post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-start gap-4">
          <div className="flex items-center w-full justify-start gap-12">
            <img
              src={image}
              alt="profile pic"
              className='h-48 w-48 rounded-full'
            />
            <div className="flex flex-col items-start justify-center w-full">
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input
                id='username'
                className='col-span-3 mb-5 focus-visible:ring-offset-0'
                placeholder='pedrinho123...'
              />
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Input
                id='email'
                className='col-span-3 focus-visible:ring-offset-0'
                placeholder='pedrinho123@gmail.com'
              />
            </div>
          </div>
          <Textarea
            placeholder='Text your bio...'
            className='resize-none focus-visible:ring-offset-0 h-60 text-base'
            onChange={e => handleBioLen(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-start">
          <div className={
            bioLen > maxBioSize
            ? "text-red-500"
            : "text-zinc-600"
          }>
            {bioLen}/{maxBioSize}
          </div>
          <DialogFooter>
            <Button
            size={'lg'}
            className='text-lg focus-visible:ring-offset-0'
            variant={'destructive'}
            onClick={closeModal}
            >Cancel</Button>
            <Button
            type="submit"
            size={'lg'}
            disabled={bioLen > maxBioSize}
            className='text-lg focus-visible:ring-offset-0'
            variant={'save'}>Save</Button>
          </DialogFooter>
          </div>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
