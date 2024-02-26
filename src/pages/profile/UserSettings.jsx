import React, { useState } from "react";
import { useDatabse } from "../../appwriteBackend/database/databse";
import { useStorage } from "../../appwriteBackend/storage/storage";

export default function UserSettings() {
  const { setOtherProfileCred } = useDatabse();
  const { createPostImage } = useStorage();
  const [settings, setSettings] = useState({
    fullname: "",
    tagline: "",
    image: "",
    about: "",
    skills: "",
    twitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    website: "",
  });
  const [file, setfile] = useState(null);
  const handleUpdate = async () => {
    const imageid = await createPostImage(file);
    setSettings((prev) => ({ ...prev, image: imageid }));
    const promise = await setOtherProfileCred(settings);
    console.log(promise);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={settings.fullName}
            onChange={(e) =>
              setSettings({ ...settings, fullName: e.target.value })
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
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            photo
          </label>
          <input
            type="file"
            onChange={(e) => setfile(e.target.files[0])}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
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
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Social</h2>
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
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Profile Identity</h2>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            value={settings.username}
            onChange={(e) =>
              setSettings({ ...settings, username: e.target.value })
            }
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
            onChange={(e) =>
              setSettings({ ...settings, email: e.target.value })
            }
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
