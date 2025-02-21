import React from "react"
import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//import categories from "@/categories.json"
import { Upload } from "lucide-react"
import { getRequest, postRequest } from '@/utils/api'

// Mock data for categories and subcategories
/*const categories = {
  Film: ["Best Picture", "Best Director", "Best Actor", "Best Actress"],
  Television: ["Best Drama Series", "Best Comedy Series", "Best Limited Series"],
  Music: ["Album of the Year", "Song of the Year", "Best New Artist"],
}*/

export default function NomineeRegistrationForm() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubCategory] = useState("")
  const [categories, setCategories] = useState("")

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
  defaultValues: {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    category: "",
    subCategory: "",
    profilePhoto: null,
  }
});

  const [profilePhoto, setProfilePhoto] = useState(null)
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
    const url = `${import.meta.env.VITE_API_URL}/categories/`;
	    console.log(url)
    try {
	    const response = await getRequest(url);
	    console.log(response)
	    const data = await response.json()
	   
	    console.log(data)
	    if (response.ok) {
		    setCategories(data)
            
            } else {
              alert("get job error")
             }
      } catch (error) {
        console.log(error)
      }
    }
	  fetchCategories()
  }, []);

  const onSubmit = async (data) => {
	  console.log(data)
	  const url = `${import.meta.env.VITE_API_URL}/nominees/`;
	  console.log(url)
	  const category = categories.find(category => category.name === data["category"])

	  const sub_category = category.sub_categories.find(subcategory => subcategory.name === data["subCategory"])
	  try {
		  const newData = {
	            first_name: data["firstName"],
		    last_name: data['lastName'],
	            email: data['email'],
		    bio: data['bio'],
		    stage_name: data['stageName'],
		    category_id: category.id,
		    sub_category: sub_category.id,
		    phone_number: data["phoneNumber"],
		    profile_photo: data["profilePhoto"]
		  }
		  console.log(newData)

		  const response = await postRequest(url, newData);
		  console.log(response)
		  if (response.ok) {
			  const data = await response.json()
			  console.log(data)

		  } else {
			  const data = await response.json()
			  console.log(data)
			  alert("post job error")
		  }
	  } catch (error) {
		  console.log(error)
	  }
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
      setValue("profilePhoto", file)
      setProfilePhoto(file)
    }
  }


  
  const handleSelectCategory = (value) => {
    setValue("category", value)
    setSelectedCategory(value)
  }

  const handleSelectSubCategory = (value) => {
    setValue("subCategory", value)
    setSelectedSubCategory(value)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center">
	  <div className="w-3/4 min-h-[50vh] border-4 border-yellow-400 rounded-lg mx-auto flex flex-col justify-center">
    <Card className="w-full max-w-lg mx-auto bg-yellow-400 ">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" method="POST">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nominee First Name</Label>
            <input {...register('firstName', {required: "Please enter nominee's first name"})}
              id="firstName"
              placeholder="Enter nominee's first name"
	      type="text"
	      className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs"
            />
	    {errors?.firstName?.message && <span className='text-red-500 text-xs'>{errors?.firstName?.message.toString()}</span>}
          </div>
	  <div className="space-y-2">
	    <Label htmlFor="lastName">Nominee Last Name</Label>
	    <input {...register('lastName', {required: "Please enter nominee's last name"})}
    	      id="lastName"
	      placeholder="Enter nominee's last name"
	      type="text"
	      className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs"
	    />
	    {errors?.lastName?.message && <span className='text-red-500 text-xs'>{errors?.lastName?.message.toString()}</span>}
	  </div>
	  <div className="space-y-2">
	    <Label htmlFor="stageName">Nominee Stage Name</Label>
	    <input {...register('stageName', {required: "Please enter nominee's stage name"})}
	      id="stageName"
	      placeholder="Enter nominee's stage name"
	      type="text"
	      className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs"
	    />
	    {errors?.stageName?.message && <span className='text-red-500 text-xs'>{errors?.stageName?.message.toString()}</span>}
	  </div>
	
          <div className="space-y-2">
	    <Label htmlFor="email">Email address</Label>
	    <input id="email" type="email" autoComplete="email"
	    {...register("email", {
	      required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" }
              })}
	      placeholder="Email"
	      className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs"
            />
              {errors?.email?.message && <span className='text-red-500 text-xs'>{errors?.email?.message.toString()}</span>}
          </div>

	  <div className="space-y-2">
	    <Label htmlFor="phoneNumber">Nominee Phone Number</Label>
	    <input {...register('phoneNumber', {required: "Please enter nominee's phone number"})}
	      id="phoneNumber"
	      placeholder="Enter nominee's phone number"
	      type="text"
	      className="flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs"
	      
	    />
	    {errors?.phoneNumber?.message && <span className='text-red-500 text-xs'>{errors?.phoneNumber?.message.toString()}</span>}
	  </div>
	  
	  <div className="space-y-2">
	    <Label htmlFor="bio">Nominee Bio</Label>
	    <textarea id="bio" type="text"             {...register("bio")}
	      placeholder="Bio"
	      className="flex w-full min-w-0 rounded-md border px-3 py-1 shadow-xs"
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
	      {...register('profilePhoto')}
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
                {categories && (categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                )))}
              </SelectContent>
            </Select>
          </div>
          {selectedCategory && (
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select onValueChange={handleSelectSubCategory}
 required>
                <SelectTrigger id="subcategory">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {categories.find(category => category.name === watch("category"))?.sub_categories?.map((subcategory) => (
                    <SelectItem key={subcategory.name} value={subcategory.name}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
	  <Button type="submit" className="w-full">
	    Register Nominee
	  </Button>
        </form>
      </CardContent>
    </Card>
	  </div>
    </div>
  )
}

