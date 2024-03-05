import React, { useEffect, useState } from "react";
import { useDatabse } from "../../appwriteBackend/database/databse";
import { useStorage } from "../../appwriteBackend/storage/storage";
import { useBlog } from "../../global/blogcontext";
import conf from "../../conf/conf";
export default function UserSettings() {
  const { username } = useBlog();
  const { getTheProfileDocument } = useDatabse();

  const { setOtherProfileCred } = useDatabse();
  const { createPostImage, imagePreview } = useStorage();
  const [settings, setSettings] = useState({
    fullname: "",
    tagline: "",
    image: "",
    about: "",
    skills: "",
    email: "",
    twitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    username: "",
    website: "",
  });
  const [file, setfile] = useState(null);

  async function getCred() {
    const promise = await getTheProfileDocument(username, conf.profile_id);
    if (promise != undefined) {
      setSettings({
        fullname: promise.fullname,
        tagline: promise.tagline,
        image: promise.image,
        about: promise.about,
        username: promise.username,
        skills: promise.skills,
        email: promise.email,
        twitter: promise.twitter,
        instagram: promise.instagram,
        facebook: promise.facebook,
        linkedin: promise.linkedin,
        website: promise.website,
      });
    }
    const promise2 = await imagePreview(promise.image);
    setfile(promise2.href);
    console.log(promise2);
    // console.log(promise);
  }
  useEffect(() => {
    // console.log(settings);
  }, [settings]);
  useEffect(() => {
    getCred();
  }, []);
  const handleUpdate = async () => {
    console.log(file);
    const imageid = await createPostImage(file);
    setSettings((prev) => ({ ...prev, image: imageid.$id }));
    const promise = await setOtherProfileCred(username, settings);
    console.log(promise);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-white">User Settings</h1>

      <section className="mb-6 text-black ">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Basic Information
        </h2>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={settings.fullname}
            onChange={(e) =>
              setSettings({ ...settings, fullname: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Tagline
          </label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) =>
              setSettings({ ...settings, tagline: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          {file == "" ? (
            <div>
              {" "}
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                photo
              </label>
              <input
                type="file"
                onChange={(e) => setfile(e.target.files[0])}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <div>
              <img src={file} alt="" />

              <label className="block text-gray-600 text-sm font-semibold mb-1">
                photo
              </label>
              <input
                type="file"
                onChange={(e) => setfile(e.target.files[0])}
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            about
          </label>
          <textarea
            value={settings.about}
            onChange={(e) =>
              setSettings({ ...settings, about: e.target.value })
            }
            name="about"
            id="about"
            cols="30"
            rows="10"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            skills
          </label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) =>
              setSettings({ ...settings, skills: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </section>

      {/* Social Section */}
      <section className="mb-6 text-black ">
        <h2 className="text-lg font-semibold mb-2 text-white">Social</h2>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Twitter Link
          </label>
          <input
            type="text"
            value={settings.twitter}
            onChange={(e) =>
              setSettings({ ...settings, twitter: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Instagram Link
          </label>
          <input
            type="text"
            value={settings.instagram}
            onChange={(e) =>
              setSettings({ ...settings, instagram: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Facebook Link
          </label>
          <input
            type="text"
            value={settings.facebook}
            onChange={(e) =>
              setSettings({ ...settings, facebook: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <h2 className="text-lg font-semibold mb-2">Social</h2>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Website Link
          </label>
          <input
            type="text"
            value={settings.website}
            onChange={(e) =>
              setSettings({ ...settings, website: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Linkedin Link
          </label>
          <input
            type="text"
            value={settings.linkedin}
            onChange={(e) =>
              setSettings({ ...settings, linkedin: e.target.value })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </section>

      {/* Profile Identity Section */}
      <section className="mb-6 text-black ">
        <h2 className="text-lg font-semibold mb-2 text-white">
          Profile Identity
        </h2>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            value={settings.username}
            readOnly
            // onChange={(e) =>
            //   setSettings({ ...settings, username: e.target.value })
            // }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="text"
            value={settings.email}
            readOnly
            // onChange={(e) =>
            //   setSettings({ ...settings, email: e.target.value })
            // }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </section>

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Update
      </button>
    </div>
  );
}
