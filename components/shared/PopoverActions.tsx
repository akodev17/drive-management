"use client";

import { FileUp, Folder, FolderUp } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { useFolder } from "@/app/hooks/useFolder";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "sonner";

const PopoverActions = () => {
  const { onOpen } = useFolder();
  const inputRef = useRef<ElementRef<"input">>(null);
  const { user } = useUser();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    let Image = "";

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      Image = e.target?.result as string;
    };

    const promise = addDoc(collection(db, "files"), {
      name: file.name,
      type: file.type,
      size: file.size,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchive: false,
    }).then((docs) => {
      const refs = ref(storage, `files/${docs.id}/image`);
      uploadString(refs, Image, "data_url").then(() => {
        getDownloadURL(refs).then((url) => {
          updateDoc(doc(db, "files", docs.id), {
            Image: url
          })
        });
      });
    });
    toast.promise(promise, {
      loading: "Loading...",
      success: "Uploaded!",
      error: "Error uploading file"
    })
  };

  return (
    <div>
      <div
        onClick={onOpen}
        className="flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer"
      >
        <Folder className="mr-2" />
        <span>New Folder</span>
      </div>
      <Separator />
      <label>
        <div className="flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer">
          <FileUp className="mr-2" />
          <span>New File</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="Image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
      <Separator />
      <label>
        <div className="flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer">
          <FolderUp className="mr-2" />
          <span>Folder upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="Image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
      <Separator />
    </div>
  );
};

export default PopoverActions;
