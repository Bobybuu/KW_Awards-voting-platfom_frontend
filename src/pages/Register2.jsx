import React from "react"
import { useForm } from 'react-hook-form'
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import categories from "@/categories.json"
import { Upload } from "lucide-react"


// Mock data for categories and subcategories
/*const categories = {
  Film: ["Best Picture", "Best Director", "Best Actor", "Best Actress"],
  Television: ["Best Drama Series", "Best Comedy Series", "Best Limited Series"],
  Music: ["Album of the Year", "Song of the Year", "Best New Artist"],
}*/

export default function NomineeRegistrationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const {
	 register,
	  handleSubmit,
	  formState: { errors }} = useForm();
  
  const [profilePhoto, setProfilePhoto] = useState(null)
  const fileInputRef = useRef(null);
  
  const onSubmit = (e) => {
	  console.log(e)
	  console.log("Form submitted:", { name, email, selectedCategory, selectedSubcategory, profilePhoto })
	  // Here you would typically send the data to your backend
  }
  
  const handleFileChange = (e) => {
	  const file = e.target.files?.[0]
	  if (file) {
      // Basic file validation
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }

      setProfilePhoto(file)
    }
  }


  
  const handleSelectCategory = (category) => {
	  console.log(category)
    setSelectedCategory(category)
	  setSelectedCategory((prev) => prev)
	  console.log("....", selectedCategory)
	  console.log(Object.keys(categories[selectedCategory].sub_categories))
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center">
	  <div className="w-3/4 min-h-[50vh] border-4 border-yellow-400 rounded-lg mx-auto flex flex-col justify-center">
    <Card className="w-full max-w-lg mx-auto bg-yellow-400 ">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nominee First Name</Label>
            <Input {...register('firstName', {required: "Please enter nominee's first name"})}
              id="firstName"
              placeholder="Enter nominee's first name"
	      type="text"
              required
            />
	    {errors?.firstName?.message && <span className='text-red-500 text-xs'>{errors?.firstName?.message.toString()}</span>}
          </div>
	  <div className="space-y-2">
	    <Label htmlFor="lastName">Nominee Last Name</Label>
	    <Input {...register('lastName', {required: "Please enter nominee's last name"})}
    	      id="lastName"
	      placeholder="Enter nominee's last name"
	      type="text"
	      required
	    />
	    {errors?.lastName?.message && <span className='text-red-500 text-xs'>{errors?.lastName?.message.toString()}</span>}
	  </div>
	  <div className="space-y-2">
	    <Label htmlFor="stageName">Nominee Stage Name</Label>
	    <Input {...register('stageName', {required: "Please enter nominee's stage name"})}
	      id="stageName"
	      placeholder="Enter nominee's stage name"
	      type="text"
	      required
	    />
	    {errors?.stageName?.message && <span className='text-red-500 text-xs'>{errors?.stageName?.message.toString()}</span>}
	  </div>
	
          <div className="space-y-2">
	    <Label htmlFor="email">Email address</Label>
	    <Input id="email" type="email" autoComplete="email" className="mt-1"
	    {...register("email", {
	      required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" }
              })}
	      placeholder="Email"
            />
              {errors?.email?.message && <span className='text-red-500 text-xs'>{errors?.email?.message.toString()}</span>}
          </div>

	  <div className="space-y-2">
	    <Label htmlFor="phoneNumber">Nominee Phone Number</Label>
	    <Input {...register('phoneNumber', {required: "Please enter nominee's phone number"})}
	      id="phoneNumber"
	      placeholder="Enter nominee's phone number"
	      type="text"
	      
	    />
	    {errors?.phoneNumber?.message && <span className='text-red-500 text-xs'>{errors?.phoneNumber?.message.toString()}</span>}
	  </div>
	  
	  <div className="space-y-2">
	    <Label htmlFor="bio">Nominee Bio</Label>
	    <Textarea id="bio" type="text"             {...register("bio")}
	      placeholder="Bio"
	    />
	    {errors?.bio?.message && <span className='text-red-500 text-xs'>{errors?.bio?.message.toString()}</span>}
	  </div>
	  <div className="space-y-2">
	    <Button
	      type="button"
	      variant="outline"
	      onClick={() => fileInputRef.current?.click()}
	      className="flex items-center space-x-2"
	    >
	      <Upload className="w-4 h-4" />
	      <span>Upload Photo</span>
	    </Button>
	    <input 
	      {...register('profilePhoto', {required: "Please enter nominee's profile photo"})}
	      id="profilePhoto"
	      ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
	  </div>
	  
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleSelectCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categories).map((category) => (
                  <SelectItem key={category.name} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedCategory && (
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select onValueChange={setSelectedSubcategory} required>
                <SelectTrigger id="subcategory">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories[selectedCategory].sub_categories).map((subcategory) => (
                    <SelectItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Register Nominee
        </Button>
      </CardFooter>
    </Card>
	  </div>
    </div>
  )
}

