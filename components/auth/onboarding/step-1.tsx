import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export default function Step1() {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2 text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Create Pet Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Add your pet's details to find the perfect match.
        </p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your pet's name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              placeholder="Enter your pet's age"
              required
              type="number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" placeholder="Enter your pet's breed" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full" type="submit">
          Create Profile
        </Button>
      </form>
    </div>
  );
}
