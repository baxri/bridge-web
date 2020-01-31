export default function createContactFromIntro(intro, prefix) {
  return {
    name: intro[prefix] || '',
    email: intro[prefix + '_email'] || '',
    profile_pic_url: intro[prefix + '_profile_pic_url'] || '',
    linkedin_profile_url: intro[prefix + '_linkedin_profile_url'] || '',
  }
}
