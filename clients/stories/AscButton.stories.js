import MyButton from '../docs/.vuepress/components/AscButton'

export default {
  title: 'Example/AscButton',
  component: MyButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @onClick="onClick" v-bind="$props" />'
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Ascension'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Ascension'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Ascension'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Ascension'
}
