"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFolder } from "@/app/hooks/useFolder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
const FolderMode = () => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = addDoc(collection(db, "folders"), {
      name: values.name,
      timestamp: serverTimestamp(),
      uid: user?.id,
      IsArchive: false,
    }).then(() => {
      form.reset();
      onClose();
    });
    toast.promise(promise, {
      loading: "Loading...",
      success: "Folder created",
      error: "Error creating folder",
    });
  }

  const { isOpen, onClose } = useFolder();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New folder</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center">
                <Button
                  type="button"
                  size={"sm"}
                  variant={"link"}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" variant={"outline"}>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderMode;
