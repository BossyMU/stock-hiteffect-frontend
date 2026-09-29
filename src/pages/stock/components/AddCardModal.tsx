import { useState } from 'react'
import { CatalogSearchSection } from '@/components/cards'
import { FieldLabel, Modal, ModalActions, TextInput } from '@/components/ui'
import { FOIL_FIELDS, FOIL_STYLES } from '@/constants/card'
import type { Card, CatalogCard, FoilType } from '@/types'
import { cn } from '@/utils/cn'
import { uid } from '@/utils/id'

/** Foil column order used by this form (matches the design). */
const FORM_FOILS: FoilType[] = ['Non-Foil', 'Rainbow Foil', 'Cold Foil']

const emptyCard = (): Card => ({
  id: uid(),
  name: '',
  set: '',
  setCode: '',
  condition: 'NM',
  stockNF: 0,
  stockCF: 0,
  stockRF: 0,
  buyPrice: 0,
  sellPriceNF: 0,
  sellPriceCF: 0,
  sellPriceRF: 0,
  rarity: 'Rare',
})

interface AddCardModalProps {
  onSave: (card: Card) => void
  onClose: () => void
}

/** Pick a card from the catalog and enter its per-foil stock. */
export function AddCardModal({ onSave, onClose }: AddCardModalProps) {
  const [form, setForm] = useState<Card>(emptyCard)

  const setNumber = (field: keyof Card, value: number) => setForm((f) => ({ ...f, [field]: value }))
  const handleCatalogSelect = (c: CatalogCard) =>
    setForm((f) => ({ ...f, name: c.name, set: c.set, setCode: c.setCode, rarity: c.rarity }))

  const handleSave = () => {
    if (!form.name) return
    onSave(form)
    onClose()
  }

  return (
    <Modal
      onClose={onClose}
      className="max-h-[92vh] max-w-lg overflow-y-auto p-6"
      labelledBy="add-card-title"
    >
      <h2 id="add-card-title" className="mb-5 text-lg font-semibold">
        Add Card to Stock
      </h2>

      <CatalogSearchSection selected={form.name ? form : null} onSelect={handleCatalogSelect} />

      <FoilStockGrid form={form} onChange={setNumber} />

      <ModalActions className="mt-6" onCancel={onClose} onConfirm={handleSave} confirmLabel="Add to Stock" />
    </Modal>
  )
}

function FoilStockGrid({
  form,
  onChange,
}: {
  form: Card
  onChange: (field: keyof Card, value: number) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {FORM_FOILS.map((foil) => {
        const style = FOIL_STYLES[foil]
        const key = FOIL_FIELDS[foil].stock
        const id = `add-card-${key}`
        return (
          <div key={foil}>
            <FieldLabel htmlFor={id} className={style.text}>
              {style.short} Stock
            </FieldLabel>
            <TextInput
              id={id}
              type="number"
              min={0}
              className={cn('w-full font-mono', style.border, style.text)}
              value={form[key] as number}
              onChange={(e) => onChange(key, +e.target.value)}
            />
          </div>
        )
      })}
    </div>
  )
}
